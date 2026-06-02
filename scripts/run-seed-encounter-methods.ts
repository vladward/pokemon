import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, fetchWithRetry, limit } from './seed-utils';

interface EncounterMethodDetail {
  id: number;
  name: string;
  order: number | null;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/encounter-method?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total encounter methods: ${all.length}`);

  const results = await Promise.allSettled(all.map((m) => limit(() => fetchWithRetry(m.url))));
  const details: EncounterMethodDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as EncounterMethodDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const methodRows: [number, string, number | null][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    methodRows.push([d.id, d.name, d.order ?? null]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (methodRows.length)
      await conn.query(
        'INSERT INTO encounter_method (id, name, order_index) VALUES ? ON DUPLICATE KEY UPDATE order_index=VALUES(order_index)',
        [methodRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO encounter_method_name (method_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL ENCOUNTER METHODS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
