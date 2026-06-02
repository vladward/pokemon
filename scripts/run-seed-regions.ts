import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface RegionDetail {
  id: number;
  name: string;
  main_generation: { url: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/region?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total regions: ${all.length}`);

  const results = await Promise.allSettled(all.map((r) => limit(() => fetchWithRetry(r.url))));
  const details: RegionDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as RegionDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const regionRows: [number, string, number | null][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    regionRows.push([d.id, d.name, d.main_generation ? extractId(d.main_generation.url) : null]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (regionRows.length)
      await conn.query(
        'INSERT INTO region (id, name, main_generation_id) VALUES ? ON DUPLICATE KEY UPDATE main_generation_id=VALUES(main_generation_id)',
        [regionRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO region_name (region_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL REGIONS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
