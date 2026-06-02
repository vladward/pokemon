import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface CharacteristicDetail {
  id: number;
  gene_modulo: number;
  highest_stat: { url: string } | null;
  descriptions: Array<{ language: { name: string }; description: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/characteristic?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total characteristics: ${all.length}`);

  const results = await Promise.allSettled(all.map((c) => limit(() => fetchWithRetry(c.url))));
  const details: CharacteristicDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as CharacteristicDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const characteristicRows: [number, number, number | null][] = [];
  const descriptionRows: [number, string, string][] = [];

  for (const d of details) {
    characteristicRows.push([
      d.id,
      d.gene_modulo,
      d.highest_stat ? extractId(d.highest_stat.url) : null,
    ]);

    for (const desc of d.descriptions ?? [])
      descriptionRows.push([d.id, desc.language.name, desc.description]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (characteristicRows.length)
      await conn.query(
        `INSERT INTO characteristic (id, gene_modulo, highest_stat_id)
                 VALUES ? ON DUPLICATE KEY
                 UPDATE
                     gene_modulo=
                 VALUES (gene_modulo), highest_stat_id=
                 VALUES (highest_stat_id)`,
        [characteristicRows],
      );

    if (descriptionRows.length)
      await conn.query(
        'INSERT INTO characteristic_description (characteristic_id, language, description) VALUES ? ON DUPLICATE KEY UPDATE description=VALUES(description)',
        [descriptionRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL CHARACTERISTICS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
