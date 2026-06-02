import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

const LOC_STATE_ID = 'locations_offset';
const AREA_STATE_ID = 'location_areas_offset';
const BATCH_SIZE = 50;

interface LocationDetail {
  id: number;
  name: string;
  region: { name: string; url: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
  game_indices: Array<{ game_index: number; generation: { name: string } }>;
}

interface LocationAreaDetail {
  id: number;
  name: string;
  location: { url: string } | null;
  game_index: number | null;
  names: Array<{ language: { name: string }; name: string }>;
  pokemon_encounters: Array<{
    pokemon: { url: string };
    version_details: Array<{
      version: { name: string };
      encounter_details: Array<{
        method: { name: string; url: string };
        min_level: number | null;
        max_level: number | null;
        chance: number | null;
      }>;
    }>;
  }>;
}

async function seedLocations(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/location?limit=10000`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total locations: ${all.length}`);

  const [stateRows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [LOC_STATE_ID],
  );
  let offset = stateRows.length ? stateRows[0].value : 0;
  console.log(`Resume locations from: ${offset}`);

  const regionSeen = new Set<number>();
  const [existingRegions] =
    await db.query<(RowDataPacket & { id: number })[]>('SELECT id FROM region');
  for (const r of existingRegions) regionSeen.add(r.id);

  for (; offset < all.length; offset += BATCH_SIZE) {
    console.log(`\nLocation batch: ${offset}`);
    const batch = all.slice(offset, offset + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((l) => limit(() => fetchWithRetry(l.url))));
    const details: LocationDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as LocationDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const regionRows: [number, string][] = [];
    const locationRows: [number, string, number | null][] = [];
    const nameRows: [number, string, string][] = [];
    const gameIndexRows: [number, number, string][] = [];

    for (const d of details) {
      let regionId: number | null = null;
      if (d.region) {
        regionId = extractId(d.region.url);
        if (!regionSeen.has(regionId)) {
          regionRows.push([regionId, d.region.name]);
          regionSeen.add(regionId);
        }
      }

      locationRows.push([d.id, d.name, regionId]);

      for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);

      for (const gi of d.game_indices ?? [])
        gameIndexRows.push([d.id, gi.game_index, gi.generation.name]);
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (regionRows.length)
        await conn.query(
          'INSERT INTO region (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [regionRows],
        );

      if (locationRows.length)
        await conn.query(
          'INSERT INTO location (id, name, region_id) VALUES ? ON DUPLICATE KEY UPDATE region_id=VALUES(region_id)',
          [locationRows],
        );

      if (nameRows.length)
        await conn.query(
          'INSERT INTO location_name (location_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [nameRows],
        );

      if (gameIndexRows.length)
        await conn.query(
          'INSERT INTO location_game_index (location_id, game_index, generation_name) VALUES ? ON DUPLICATE KEY UPDATE generation_name=VALUES(generation_name)',
          [gameIndexRows],
        );

      await conn.query(
        'INSERT INTO seed_state (id, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)',
        [LOC_STATE_ID, offset + BATCH_SIZE],
      );
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    console.log(`Location batch done: ${offset}`);
  }

  console.log('DONE ALL LOCATIONS');
}

async function seedLocationAreas(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/location-area?limit=10000`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total location areas: ${all.length}`);

  const [stateRows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [AREA_STATE_ID],
  );
  let offset = stateRows.length ? stateRows[0].value : 0;
  console.log(`Resume areas from: ${offset}`);

  const methodSeen = new Set<number>();
  const [existingMethods] = await db.query<(RowDataPacket & { id: number })[]>(
    'SELECT id FROM encounter_method',
  );
  for (const r of existingMethods) methodSeen.add(r.id);

  for (; offset < all.length; offset += BATCH_SIZE) {
    console.log(`\nArea batch: ${offset}`);
    const batch = all.slice(offset, offset + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((a) => limit(() => fetchWithRetry(a.url))));
    const details: LocationAreaDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as LocationAreaDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const areaRows: [number, string, number | null, number | null][] = [];
    const nameRows: [number, string, string][] = [];
    const methodRows: [number, string][] = [];
    const encounterRows: [
      number,
      number,
      number,
      string,
      number | null,
      number | null,
      number | null,
    ][] = [];

    for (const d of details) {
      const locationId = d.location ? extractId(d.location.url) : null;
      areaRows.push([d.id, d.name, locationId, d.game_index ?? null]);

      for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);

      for (const pe of d.pokemon_encounters ?? []) {
        const pokemonId = extractId(pe.pokemon.url);
        for (const vd of pe.version_details ?? []) {
          for (const ed of vd.encounter_details ?? []) {
            const eMethodId = extractId(ed.method.url);
            if (!methodSeen.has(eMethodId)) {
              methodRows.push([eMethodId, ed.method.name]);
              methodSeen.add(eMethodId);
            }
            encounterRows.push([
              d.id,
              pokemonId,
              eMethodId,
              vd.version.name,
              ed.min_level ?? null,
              ed.max_level ?? null,
              ed.chance ?? null,
            ]);
          }
        }
      }
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (areaRows.length)
        await conn.query(
          'INSERT INTO location_area (id, name, location_id, game_index) VALUES ? ON DUPLICATE KEY UPDATE location_id=VALUES(location_id), game_index=VALUES(game_index)',
          [areaRows],
        );

      if (nameRows.length)
        await conn.query(
          'INSERT INTO location_area_name (area_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [nameRows],
        );

      if (methodRows.length)
        await conn.query(
          'INSERT INTO encounter_method (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [methodRows],
        );

      if (encounterRows.length)
        await conn.query(
          `INSERT INTO pokemon_encounter (area_id, pokemon_id, method_id, version, min_level, max_level, chance)
                     VALUES ? ON DUPLICATE KEY
                     UPDATE chance=
                     VALUES (chance), min_level=
                     VALUES (min_level), max_level=
                     VALUES (max_level)`,
          [encounterRows],
        );

      await conn.query(
        'INSERT INTO seed_state (id, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)',
        [AREA_STATE_ID, offset + BATCH_SIZE],
      );
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    console.log(`Area batch done: ${offset}`);
  }

  console.log('DONE ALL LOCATION AREAS');
}

async function ensureTables(): Promise<void> {
  const stmts = [
    `CREATE TABLE IF NOT EXISTS location_game_index
        (
            location_id
            int
            NOT
            NULL,
            game_index
            int
            NOT
            NULL,
            generation_name
            varchar
         (
            30
         ) NOT NULL,
            PRIMARY KEY
         (
             location_id,
             game_index,
             generation_name
         )
            )`,
  ];
  for (const sql of stmts) {
    await db.query(sql);
  }

  const alters = [
    'ALTER TABLE location_area ADD COLUMN game_index int DEFAULT NULL',
    'ALTER TABLE pokemon_encounter ADD COLUMN min_level tinyint DEFAULT NULL',
    'ALTER TABLE pokemon_encounter ADD COLUMN max_level tinyint DEFAULT NULL',
    'ALTER TABLE pokemon_encounter ADD COLUMN chance tinyint DEFAULT NULL',
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
  .then(() => seedLocations())
  .then(() => seedLocationAreas())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
