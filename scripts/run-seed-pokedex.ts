import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface PokedexDetail {
  id: number;
  name: string;
  is_main_series: boolean;
  region: { url: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
  descriptions: Array<{ language: { name: string }; description: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/pokedex?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total pokedexes: ${all.length}`);

  const results = await Promise.allSettled(all.map((p) => limit(() => fetchWithRetry(p.url))));
  const details: PokedexDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as PokedexDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const pokedexRows: [number, string, number, number | null][] = [];
  const nameRows: [number, string, string][] = [];
  const descriptionRows: [number, string, string][] = [];

  for (const d of details) {
    pokedexRows.push([
      d.id,
      d.name,
      d.is_main_series ? 1 : 0,
      d.region ? extractId(d.region.url) : null,
    ]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);

    for (const desc of d.descriptions ?? [])
      descriptionRows.push([d.id, desc.language.name, desc.description]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (pokedexRows.length)
      await conn.query(
        `INSERT INTO pokedex (id, name, is_main_series, region_id)
                 VALUES ? ON DUPLICATE KEY
                 UPDATE
                     is_main_series=
                 VALUES (is_main_series), region_id=
                 VALUES (region_id)`,
        [pokedexRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO pokedex_name (pokedex_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    if (descriptionRows.length)
      await conn.query(
        'INSERT INTO pokedex_description (pokedex_id, language, description) VALUES ? ON DUPLICATE KEY UPDATE description=VALUES(description)',
        [descriptionRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL POKEDEX');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
