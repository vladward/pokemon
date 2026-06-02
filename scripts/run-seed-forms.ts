import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

const STATE_ID = 'forms_offset';
const BATCH_SIZE = 50;

interface FormDetail {
  id: number;
  name: string;
  pokemon: { url: string } | null;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_order: number | null;
  form_name: string | null;
  version_group: { name: string; url: string } | null;
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  form_names: Array<{ language: { name: string }; name: string }>;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    back_shiny: string | null;
  } | null;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/pokemon-form?limit=10000`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total forms: ${all.length}`);

  const [stateRows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [STATE_ID],
  );
  let offset = stateRows.length ? stateRows[0].value : 0;
  console.log(`Resume from: ${offset}`);

  for (; offset < all.length; offset += BATCH_SIZE) {
    console.log(`\nBatch: ${offset}`);
    const batch = all.slice(offset, offset + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((f) => limit(() => fetchWithRetry(f.url))));
    const details: FormDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as FormDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const formRows: [
      number,
      string,
      number | null,
      boolean,
      boolean,
      boolean,
      number | null,
      number | null,
      string | null,
    ][] = [];
    const typeRows: [number, number, number][] = [];
    const nameRows: [number, string, string][] = [];
    const spriteRows: [number, string, string][] = [];
    const vgRows: [number, string][] = [];
    const vgSeen = new Set<number>();

    for (const d of details) {
      let vgId: number | null = null;
      if (d.version_group) {
        vgId = extractId(d.version_group.url);
        if (!vgSeen.has(vgId)) {
          vgRows.push([vgId, d.version_group.name]);
          vgSeen.add(vgId);
        }
      }

      const pokemonId = d.pokemon ? extractId(d.pokemon.url) : null;

      formRows.push([
        d.id,
        d.name,
        pokemonId,
        d.is_default ?? false,
        d.is_battle_only ?? false,
        d.is_mega ?? false,
        d.form_order ?? null,
        vgId,
        d.form_name ?? null,
      ]);

      for (const t of d.types ?? []) typeRows.push([d.id, t.slot, extractId(t.type.url)]);

      for (const n of d.form_names ?? []) nameRows.push([d.id, n.language.name, n.name]);

      // Flatten sprites
      const sp = d.sprites ?? {
        front_default: null,
        front_shiny: null,
        back_default: null,
        back_shiny: null,
      };
      const spriteFields: [string, string | null][] = [
        ['front_default', sp.front_default],
        ['front_shiny', sp.front_shiny],
        ['back_default', sp.back_default],
        ['back_shiny', sp.back_shiny],
      ];
      for (const [slot, url] of spriteFields) {
        if (url) spriteRows.push([d.id, slot, url]);
      }
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (vgRows.length)
        await conn.query(
          'INSERT INTO version_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [vgRows],
        );

      if (formRows.length)
        await conn.query(
          `INSERT INTO pokemon_form (id, name, pokemon_id, is_default, is_battle_only, is_mega, form_order,
                                               version_group_id, form_name)
                     VALUES ? ON DUPLICATE KEY
                     UPDATE
                         name =
                     VALUES (name), pokemon_id=
                     VALUES (pokemon_id), is_default=
                     VALUES (is_default), is_battle_only=
                     VALUES (is_battle_only), is_mega=
                     VALUES (is_mega), form_order=
                     VALUES (form_order), version_group_id=
                     VALUES (version_group_id), form_name=
                     VALUES (form_name)`,
          [formRows],
        );

      if (typeRows.length)
        await conn.query(
          'INSERT INTO pokemon_form_type (form_id, slot, type_id) VALUES ? ON DUPLICATE KEY UPDATE type_id=VALUES(type_id)',
          [typeRows],
        );

      if (nameRows.length)
        await conn.query(
          'INSERT INTO pokemon_form_name (form_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [nameRows],
        );

      if (spriteRows.length)
        await conn.query(
          'INSERT INTO pokemon_form_sprite (form_id, slot, url) VALUES ? ON DUPLICATE KEY UPDATE url=VALUES(url)',
          [spriteRows],
        );

      await conn.query(
        'INSERT INTO seed_state (id, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)',
        [STATE_ID, offset + BATCH_SIZE],
      );
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    console.log(`Batch done: ${offset}`);
  }

  console.log('DONE ALL FORMS');
}

async function ensureTables(): Promise<void> {
  // Tables are created by run-migrate.ts — this is a no-op safety net
  const stmts = [
    `CREATE TABLE IF NOT EXISTS pokemon_form_type
        (
            form_id
            int
            NOT
            NULL,
            slot
            tinyint
            NOT
            NULL,
            type_id
            int
            NOT
            NULL,
            PRIMARY
            KEY
         (
            form_id,
            slot
         )
            )`,
    `CREATE TABLE IF NOT EXISTS pokemon_form_name
        (
            form_id
            int
            NOT
            NULL,
            language
            varchar
         (
            10
         ) NOT NULL,
            name varchar
         (
             100
         ) NOT NULL,
            PRIMARY KEY
         (
             form_id,
             language
         )
            )`,
    `CREATE TABLE IF NOT EXISTS pokemon_form_sprite
        (
            form_id
            int
            NOT
            NULL,
            slot
            varchar
         (
            30
         ) NOT NULL,
            url varchar
         (
             255
         ) NOT NULL,
            PRIMARY KEY
         (
             form_id,
             slot
         )
            )`,
  ];
  for (const sql of stmts) {
    await db.query(sql);
  }

  const alters = [
    'ALTER TABLE pokemon_form ADD COLUMN name varchar(100) DEFAULT NULL',
    'ALTER TABLE pokemon_form ADD COLUMN form_name varchar(100) DEFAULT NULL',
    'ALTER TABLE pokemon_form ADD COLUMN is_default tinyint(1) DEFAULT NULL',
    'ALTER TABLE pokemon_form ADD COLUMN is_battle_only tinyint(1) DEFAULT NULL',
    'ALTER TABLE pokemon_form ADD COLUMN is_mega tinyint(1) DEFAULT NULL',
    'ALTER TABLE pokemon_form ADD COLUMN form_order int DEFAULT NULL',
    'ALTER TABLE pokemon_form ADD COLUMN version_group_id int DEFAULT NULL',
  ];
  for (const sql of alters) {
    try {
      await db.query(sql);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException & { code?: string }).code !== 'ER_DUP_FIELDNAME') throw err;
    }
  }
}

ensureTables()
  .then(() => run())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
