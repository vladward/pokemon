import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, fetchWithRetry, limit } from './seed-utils';

interface StatDetail {
  id: number;
  name: string;
  game_index: number | null;
  is_battle_only: boolean;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/stat?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total stats: ${all.length}`);

  const results = await Promise.allSettled(all.map((s) => limit(() => fetchWithRetry(s.url))));
  const details: StatDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as StatDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const statRows: [number, string, number | null, number][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    statRows.push([d.id, d.name, d.game_index ?? null, d.is_battle_only ? 1 : 0]);
    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (statRows.length)
      await conn.query(
        `INSERT INTO stat (id, name, game_index, is_battle_only)
                 VALUES ? ON DUPLICATE KEY
                 UPDATE
                     game_index=
                 VALUES (game_index), is_battle_only=
                 VALUES (is_battle_only)`,
        [statRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO stat_name (stat_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL STATS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
