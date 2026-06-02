import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, fetchWithRetry, limit } from './seed-utils';

interface NatureDetail {
  id: number;
  name: string;
  decreased_stat: { name: string } | null;
  increased_stat: { name: string } | null;
  hates_flavor: { name: string } | null;
  likes_flavor: { name: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
  pokeathlon_stat_changes: Array<{ pokeathlon_stat: { name: string }; max_change: number }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/nature?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total natures: ${all.length}`);

  const results = await Promise.allSettled(all.map((n) => limit(() => fetchWithRetry(n.url))));
  const details: NatureDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as NatureDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const natureRows: [number, string, string | null, string | null, string | null, string | null][] =
    [];
  const nameRows: [number, string, string][] = [];
  const pokeathlonRows: [number, string, number][] = [];

  for (const d of details) {
    natureRows.push([
      d.id,
      d.name,
      d.decreased_stat?.name ?? null,
      d.increased_stat?.name ?? null,
      d.hates_flavor?.name ?? null,
      d.likes_flavor?.name ?? null,
    ]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);

    for (const ps of d.pokeathlon_stat_changes ?? [])
      pokeathlonRows.push([d.id, ps.pokeathlon_stat.name, ps.max_change]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (natureRows.length)
      await conn.query(
        `INSERT INTO nature (id, name, decreased_stat, increased_stat, hates_flavor, likes_flavor)
                 VALUES ? ON DUPLICATE KEY
                 UPDATE
                     decreased_stat=
                 VALUES (decreased_stat), increased_stat=
                 VALUES (increased_stat), hates_flavor=
                 VALUES (hates_flavor), likes_flavor=
                 VALUES (likes_flavor)`,
        [natureRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO nature_name (nature_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    if (pokeathlonRows.length)
      await conn.query(
        'INSERT INTO nature_pokeathlon_stat (nature_id, stat_name, max_change) VALUES ? ON DUPLICATE KEY UPDATE max_change=VALUES(max_change)',
        [pokeathlonRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL NATURES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
