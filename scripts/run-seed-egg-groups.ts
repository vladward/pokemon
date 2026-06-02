import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, fetchWithRetry, limit } from './seed-utils';

interface EggGroupDetail {
  id: number;
  name: string;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/egg-group?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total egg groups: ${all.length}`);

  const results = await Promise.allSettled(all.map((g) => limit(() => fetchWithRetry(g.url))));
  const details: EggGroupDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as EggGroupDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const eggGroupRows: [number, string][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    eggGroupRows.push([d.id, d.name]);
    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (eggGroupRows.length)
      await conn.query(
        'INSERT INTO egg_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [eggGroupRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO egg_group_name (egg_group_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL EGG GROUPS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
