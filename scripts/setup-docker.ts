import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve } from 'path';

import 'dotenv/config';
import mysql from 'mysql2/promise';

const DOCKER_HOST = 'localhost';
const DOCKER_PORT = 3306;
const DOCKER_USER = 'root';
const DOCKER_PASSWORD = 'root';
const DOCKER_DB = 'pokemon';

function log(msg: string) {
  console.log(`\n[setup] ${msg}`);
}

function run(cmd: string) {
  log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

function checkEnvFile() {
  const envPath = resolve('.env');
  if (!existsSync(envPath)) {
    console.error(
      '\n[setup] .env file not found.\n' +
        '        Run: cp .env.example .env\n' +
        '        Then fill in DATABASE_URL_TIDB with your TiDB credentials and retry.\n',
    );
    process.exit(1);
  }
}

function checkDockerRunning() {
  try {
    execSync('docker info', { stdio: 'pipe' });
  } catch {
    console.error(
      '\n[setup] Docker is not running.\n' + '        Start Docker Desktop and retry.\n',
    );
    process.exit(1);
  }
}

async function waitForMySQL(maxAttempts = 30, delayMs = 2000): Promise<void> {
  log(`Waiting for MySQL at ${DOCKER_HOST}:${DOCKER_PORT}...`);
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const conn = await mysql.createConnection({
        host: DOCKER_HOST,
        port: DOCKER_PORT,
        user: DOCKER_USER,
        password: DOCKER_PASSWORD,
        database: DOCKER_DB,
      });
      await conn.ping();
      await conn.end();
      log('MySQL is ready.');
      return;
    } catch {
      process.stdout.write(`\r[setup] Attempt ${i}/${maxAttempts} — not ready yet...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  console.error('\n[setup] MySQL did not become ready after 60 seconds.');
  console.error('        Check container logs: docker logs pokemon_db');
  process.exit(1);
}

async function getPokemonCount(): Promise<number> {
  try {
    const conn = await mysql.createConnection({
      host: DOCKER_HOST,
      port: DOCKER_PORT,
      user: DOCKER_USER,
      password: DOCKER_PASSWORD,
      database: DOCKER_DB,
    });
    const [rows] = await conn.query<mysql.RowDataPacket[]>('SELECT COUNT(*) AS cnt FROM `pokemon`');
    await conn.end();
    return rows[0].cnt as number;
  } catch {
    return 0;
  }
}

async function main() {
  log('=== Docker local DB setup ===');

  checkEnvFile();
  checkDockerRunning();

  // Start container (idempotent — safe to run if already running)
  log('Starting Docker container...');
  try {
    run('docker compose up -d');
  } catch {
    // Fallback for older Docker Desktop versions
    run('docker-compose up -d');
  }

  await waitForMySQL();

  // Switch .env to docker
  log('Switching .env to docker...');
  run('npm run db:use:docker');

  // Check if data already exists
  const count = await getPokemonCount();

  if (count > 0) {
    // Data exists — only sync schema, skip long seed
    log(`Database has ${count} pokemon rows. Running migrations only (schema sync)...`);
    run('npm run db:migrate');
    log('Done. The database is up to date.');
    log('Start the dev server: npm run dev');
    return;
  }

  // Empty DB — run full seed (migrations are included in seed:all)
  log('Database is empty. Running full seed (15–30 min)...');
  log('You can interrupt at any time — seeds are resumable.');
  run('npm run seed:all');

  log('Setup complete. Start the dev server: npm run dev');
}

main().catch((err) => {
  console.error('\n[setup] Fatal error:', err.message ?? err);
  process.exit(1);
});
