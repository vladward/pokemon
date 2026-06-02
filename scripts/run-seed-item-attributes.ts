import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, clean, fetchWithRetry, limit } from './seed-utils';

interface ItemAttributeDetail {
  id: number;
  name: string;
  names: Array<{ language: { name: string }; name: string }>;
  descriptions: Array<{ language: { name: string }; description: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/item-attribute?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total item attributes: ${all.length}`);

  const results = await Promise.allSettled(all.map((a) => limit(() => fetchWithRetry(a.url))));
  const details: ItemAttributeDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as ItemAttributeDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const attrRows: [number, string][] = [];
  const nameRows: [number, string, string, string | null][] = [];

  for (const d of details) {
    attrRows.push([d.id, d.name]);

    // PokeAPI item-attribute has `names` and `descriptions` arrays
    const nameMap = new Map<string, string>();
    for (const n of d.names ?? []) nameMap.set(n.language.name, n.name);

    const descMap = new Map<string, string>();
    for (const desc of d.descriptions ?? [])
      descMap.set(desc.language.name, clean(desc.description ?? ''));

    const langs = new Set([...nameMap.keys(), ...descMap.keys()]);
    for (const lang of langs) {
      const name = nameMap.get(lang) ?? '';
      const description = descMap.get(lang) ?? null;
      if (name) nameRows.push([d.id, lang, name, description]);
    }
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (attrRows.length)
      await conn.query(
        'INSERT INTO item_attribute (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [attrRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO item_attribute_name (attribute_id, language, name, description) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL ITEM ATTRIBUTES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
