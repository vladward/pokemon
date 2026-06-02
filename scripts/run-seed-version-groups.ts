import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface VersionGroupDetail {
  id: number;
  name: string;
  generation: { url: string } | null;
  order: number | null;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/version-group?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total version groups: ${all.length}`);

  const results = await Promise.allSettled(all.map((vg) => limit(() => fetchWithRetry(vg.url))));
  const details: VersionGroupDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as VersionGroupDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const vgRows: [number, string, number | null, number | null][] = [];

  for (const d of details) {
    vgRows.push([d.id, d.name, d.generation ? extractId(d.generation.url) : null, d.order ?? null]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (vgRows.length)
      await conn.query(
        'INSERT INTO version_group (id, name, generation_id, order_index) VALUES ? ON DUPLICATE KEY UPDATE generation_id=VALUES(generation_id), order_index=VALUES(order_index)',
        [vgRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL VERSION GROUPS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
