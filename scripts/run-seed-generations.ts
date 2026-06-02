import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface GenerationDetail {
  id: number;
  name: string;
  main_region: { url: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/generation?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total generations: ${all.length}`);

  const results = await Promise.allSettled(all.map((g) => limit(() => fetchWithRetry(g.url))));
  const details: GenerationDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as GenerationDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const generationRows: [number, string, number | null][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    generationRows.push([d.id, d.name, d.main_region ? extractId(d.main_region.url) : null]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (generationRows.length)
      await conn.query(
        'INSERT INTO generation (id, name, main_region_id) VALUES ? ON DUPLICATE KEY UPDATE main_region_id=VALUES(main_region_id)',
        [generationRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO generation_name (generation_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL GENERATIONS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
