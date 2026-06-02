import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, fetchWithRetry, limit } from './seed-utils';

interface ItemCategoryDetail {
  id: number;
  name: string;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/item-category?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total item categories: ${all.length}`);

  const results = await Promise.allSettled(all.map((c) => limit(() => fetchWithRetry(c.url))));
  const details: ItemCategoryDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as ItemCategoryDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const catRows: [number, string][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    catRows.push([d.id, d.name]);
    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (catRows.length)
      await conn.query(
        'INSERT INTO item_category (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [catRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO item_category_name (category_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL ITEM CATEGORIES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
