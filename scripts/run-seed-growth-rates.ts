import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, fetchWithRetry, limit } from './seed-utils';

interface GrowthRateDetail {
  id: number;
  name: string;
  formula: string | null;
  levels: Array<{ level: number; experience: number }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/growth-rate?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total growth rates: ${all.length}`);

  const results = await Promise.allSettled(all.map((g) => limit(() => fetchWithRetry(g.url))));
  const details: GrowthRateDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as GrowthRateDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const growthRateRows: [number, string, string | null][] = [];
  const experienceRows: [number, number, number][] = [];

  for (const d of details) {
    growthRateRows.push([d.id, d.name, d.formula ?? null]);

    for (const lvl of d.levels ?? []) experienceRows.push([d.id, lvl.level, lvl.experience]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (growthRateRows.length)
      await conn.query(
        'INSERT INTO growth_rate (id, name, formula) VALUES ? ON DUPLICATE KEY UPDATE formula=VALUES(formula)',
        [growthRateRows],
      );

    if (experienceRows.length)
      await conn.query(
        'INSERT INTO growth_rate_experience (growth_rate_id, level, experience) VALUES ? ON DUPLICATE KEY UPDATE experience=VALUES(experience)',
        [experienceRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL GROWTH RATES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
