/**
 * Bidirectional schema sync between Docker and TiDB.
 *
 * Usage:
 *   npm run db:sync             — analyze + apply diff, keep current active DB
 *   npm run db:sync docker      — analyze + apply diff, then activate Docker
 *   npm run db:sync tidb        — analyze + apply diff, then activate TiDB
 *
 * What it syncs: tables and columns (bidirectional).
 * What it does NOT modify: indexes, constraints, column types on existing columns.
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

import 'dotenv/config';
import mysql, { RowDataPacket } from 'mysql2/promise';

type Target = 'docker' | 'tidb';

// ── env helpers ──────────────────────────────────────────────────────────────

function readUrl(target: Target): string {
  const key = target === 'docker' ? 'DATABASE_URL_DOCKER' : 'DATABASE_URL_TIDB';
  const content = readFileSync(resolve('.env'), 'utf-8');
  const m = content.match(new RegExp(`^${key}="?([^"\\n]+)"?`, 'm'));
  if (!m) throw new Error(`${key} not found in .env — fill it in and retry`);
  return m[1];
}

// ── connection ────────────────────────────────────────────────────────────────

async function connect(url: string, label: string): Promise<mysql.Connection> {
  const p = new URL(url);
  const isRemote = p.hostname !== 'localhost';
  try {
    const conn = await mysql.createConnection({
      host: p.hostname,
      port: parseInt(p.port || '3306'),
      user: decodeURIComponent(p.username),
      password: decodeURIComponent(p.password),
      database: p.pathname.replace(/^\//, '').split('?')[0],
      ssl: isRemote ? { rejectUnauthorized: false } : undefined,
    });
    await conn.ping();
    return conn;
  } catch (err: unknown) {
    throw new Error(`Cannot connect to ${label}: ${(err as Error).message}`);
  }
}

// ── schema introspection ──────────────────────────────────────────────────────

async function getTables(conn: mysql.Connection): Promise<Set<string>> {
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT TABLE_NAME
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_TYPE = 'BASE TABLE'
         ORDER BY TABLE_NAME`,
  );
  return new Set(rows.map((r) => r.TABLE_NAME as string));
}

async function getColumnMap(conn: mysql.Connection): Promise<Map<string, Set<string>>> {
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT TABLE_NAME, COLUMN_NAME
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
         ORDER BY TABLE_NAME, ORDINAL_POSITION`,
  );
  const map = new Map<string, Set<string>>();
  for (const row of rows) {
    const t = row.TABLE_NAME as string;
    if (!map.has(t)) map.set(t, new Set());
    map.get(t)!.add(row.COLUMN_NAME as string);
  }
  return map;
}

async function getCreateDDL(conn: mysql.Connection, table: string): Promise<string> {
  const [rows] = await conn.query<RowDataPacket[]>(`SHOW CREATE TABLE \`${table}\``);
  return rows[0]['Create Table'] as string;
}

// ── DDL helpers ───────────────────────────────────────────────────────────────

/**
 * Strip TiDB-specific syntax so the DDL can run on standard MySQL 8.
 * Processes line-by-line to preserve structure for extractColumnDef.
 */
function stripTidbSyntax(ddl: string): string {
  return ddl
    .split('\n')
    .map((line) =>
      line
        .replace(/\/\*T!.*?\*\//g, '') // /*T![...] ... */  hints
        .replace(/\/\*!.*?\*\//g, '') // /*!50503 ... */  version comments
        .replace(/\bCLUSTERED\b/gi, '') // CLUSTERED
        .replace(/\bNONCLUSTERED\b/gi, '') // NONCLUSTERED
        .replace(/\bAUTO_RANDOM\b[^,)\n]*/gi, 'AUTO_INCREMENT') // AUTO_RANDOM → AUTO_INCREMENT
        .replace(/SHARD_ROW_ID_BITS\s*=\s*\d+[,\s]*/gi, '')
        .replace(/PRE_SPLIT_REGIONS\s*=\s*\d+[,\s]*/gi, '')
        .trimEnd(),
    )
    .join('\n');
}

/** Make a CREATE TABLE statement idempotent. */
function addIfNotExists(ddl: string): string {
  return ddl.replace(/^CREATE TABLE\s+`/, 'CREATE TABLE IF NOT EXISTS `');
}

/**
 * Extract a single column's definition line from SHOW CREATE TABLE output.
 * Returns e.g.: `evolution_stage` int DEFAULT NULL
 */
function extractColumnDef(createSql: string, colName: string): string | null {
  for (const line of createSql.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith(`\`${colName}\``)) {
      return trimmed.replace(/,$/, '').trim();
    }
  }
  return null;
}

// ── output ────────────────────────────────────────────────────────────────────

const CHECK = '  ✓';
const WARN = '  !';

function log(msg: string) {
  console.log(`[sync] ${msg}`);
}

function detail(msg: string) {
  console.log(`       ${msg}`);
}

function blank() {
  console.log('');
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const target = process.argv[2] as Target | undefined;
  if (target && target !== 'docker' && target !== 'tidb') {
    console.error('Usage: db:sync [docker|tidb]');
    process.exit(1);
  }

  if (!existsSync(resolve('.env'))) {
    console.error('[sync] .env not found — run: cp .env.example .env');
    process.exit(1);
  }

  // ── connect ────────────────────────────────────────────────────────────────

  const dockerUrl = readUrl('docker');
  const tidbUrl = readUrl('tidb');

  const dockerHost = `${new URL(dockerUrl).hostname}:${new URL(dockerUrl).port || 3306}`;
  const tidbHost = new URL(tidbUrl).hostname;

  log(`Connecting to Docker (${dockerHost})...`);
  const dockerConn = await connect(dockerUrl, 'Docker');

  log(`Connecting to TiDB  (${tidbHost})...`);
  const tidbConn = await connect(tidbUrl, 'TiDB');

  log('Connected.\n');

  // ── introspect ─────────────────────────────────────────────────────────────

  log('Analyzing schemas...');

  const [dockerTables, tidbTables] = await Promise.all([
    getTables(dockerConn),
    getTables(tidbConn),
  ]);
  const [dockerColMap, tidbColMap] = await Promise.all([
    getColumnMap(dockerConn),
    getColumnMap(tidbConn),
  ]);

  detail(`Docker : ${dockerTables.size} tables`);
  detail(`TiDB   : ${tidbTables.size} tables`);
  blank();

  // ── diff tables ────────────────────────────────────────────────────────────

  const onlyInDocker = [...dockerTables].filter((t) => !tidbTables.has(t));
  const onlyInTidb = [...tidbTables].filter((t) => !dockerTables.has(t));
  const inBoth = [...dockerTables].filter((t) => tidbTables.has(t));

  // ── diff columns ───────────────────────────────────────────────────────────

  const missingInDocker: Array<{ table: string; col: string }> = [];
  const missingInTidb: Array<{ table: string; col: string }> = [];

  for (const table of inBoth) {
    const dCols = dockerColMap.get(table) ?? new Set<string>();
    const tCols = tidbColMap.get(table) ?? new Set<string>();
    for (const col of tCols) if (!dCols.has(col)) missingInDocker.push({ table, col });
    for (const col of dCols) if (!tCols.has(col)) missingInTidb.push({ table, col });
  }

  // ── report diff ────────────────────────────────────────────────────────────

  const totalChanges =
    onlyInDocker.length + onlyInTidb.length + missingInDocker.length + missingInTidb.length;

  if (totalChanges === 0) {
    log('Schemas are identical. Nothing to sync.');
    blank();
  } else {
    log(`Found ${totalChanges} difference(s):`);
    blank();

    if (onlyInDocker.length > 0) {
      detail(`Tables missing in TiDB (${onlyInDocker.length}):`);
      onlyInDocker.forEach((t) => detail(`  + ${t}`));
      blank();
    }
    if (onlyInTidb.length > 0) {
      detail(`Tables missing in Docker (${onlyInTidb.length}):`);
      onlyInTidb.forEach((t) => detail(`  + ${t}`));
      blank();
    }
    if (missingInDocker.length > 0) {
      detail(`Columns missing in Docker (${missingInDocker.length}):`);
      missingInDocker.forEach(({ table, col }) => detail(`  + ${table}.${col}`));
      blank();
    }
    if (missingInTidb.length > 0) {
      detail(`Columns missing in TiDB (${missingInTidb.length}):`);
      missingInTidb.forEach(({ table, col }) => detail(`  + ${table}.${col}`));
      blank();
    }

    // ── apply ──────────────────────────────────────────────────────────────

    log('Applying changes...');
    blank();

    // Disable FK checks so tables can be created regardless of reference order
    await Promise.all([
      dockerConn.query('SET FOREIGN_KEY_CHECKS = 0'),
      tidbConn.query('SET FOREIGN_KEY_CHECKS = 0'),
    ]);

    // Tables missing in TiDB → create from Docker DDL
    for (const table of onlyInDocker) {
      try {
        const ddl = await getCreateDDL(dockerConn, table);
        await tidbConn.query(addIfNotExists(ddl));
        detail(`${CHECK} Created table '${table}' in TiDB`);
      } catch (err: unknown) {
        detail(`${WARN} Failed to create '${table}' in TiDB: ${(err as Error).message}`);
      }
    }

    // Tables missing in Docker → create from TiDB DDL (strip TiDB-specific syntax)
    for (const table of onlyInTidb) {
      try {
        const rawDdl = await getCreateDDL(tidbConn, table);
        const ddl = addIfNotExists(stripTidbSyntax(rawDdl));
        await dockerConn.query(ddl);
        detail(`${CHECK} Created table '${table}' in Docker`);
      } catch (err: unknown) {
        detail(`${WARN} Failed to create '${table}' in Docker: ${(err as Error).message}`);
      }
    }

    // Columns missing in Docker → add from TiDB DDL
    for (const { table, col } of missingInDocker) {
      try {
        const rawDdl = await getCreateDDL(tidbConn, table);
        const colDef = extractColumnDef(stripTidbSyntax(rawDdl), col);
        if (!colDef) {
          detail(`${WARN} Cannot extract definition for '${table}.${col}' — skipped`);
          continue;
        }
        await dockerConn.query(`ALTER TABLE \`${table}\`
                    ADD COLUMN ${colDef}`);
        detail(`${CHECK} Added '${table}.${col}' to Docker`);
      } catch (err: unknown) {
        detail(`${WARN} Failed to add '${table}.${col}' to Docker: ${(err as Error).message}`);
      }
    }

    // Columns missing in TiDB → add from Docker DDL
    for (const { table, col } of missingInTidb) {
      try {
        const ddl = await getCreateDDL(dockerConn, table);
        const colDef = extractColumnDef(ddl, col);
        if (!colDef) {
          detail(`${WARN} Cannot extract definition for '${table}.${col}' — skipped`);
          continue;
        }
        await tidbConn.query(`ALTER TABLE \`${table}\`
                    ADD COLUMN ${colDef}`);
        detail(`${CHECK} Added '${table}.${col}' to TiDB`);
      } catch (err: unknown) {
        detail(`${WARN} Failed to add '${table}.${col}' to TiDB: ${(err as Error).message}`);
      }
    }

    await Promise.all([
      dockerConn.query('SET FOREIGN_KEY_CHECKS = 1'),
      tidbConn.query('SET FOREIGN_KEY_CHECKS = 1'),
    ]);

    blank();
  }

  await dockerConn.end();
  await tidbConn.end();

  // ── activate ───────────────────────────────────────────────────────────────

  if (target) {
    log(`Activating ${target}...`);
    execSync(`npm run db:use:${target}`, { stdio: 'inherit' });
    blank();
  }

  // ── prisma reminder ────────────────────────────────────────────────────────

  if (totalChanges > 0 && onlyInDocker.length + onlyInTidb.length > 0) {
    log('New tables were added. Update the Prisma schema:');
    detail('npx prisma db pull');
    detail('npx prisma generate');
    blank();
  }

  log(`Done.${target ? `  Restart the dev server: npm run dev` : ''}`);
}

main().catch((err) => {
  console.error(`\n[sync] Fatal: ${(err as Error).message ?? err}`);
  process.exit(1);
});
