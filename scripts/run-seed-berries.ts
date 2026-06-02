import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface BerryDetail {
  id: number;
  name: string;
  item: { url: string } | null;
  growth_time: number | null;
  max_harvest: number | null;
  natural_gift_power: number | null;
  size: number | null;
  smoothness: number | null;
  soil_dryness: number | null;
  firmness: { name: string } | null;
  natural_gift_type: { url: string } | null;
  flavors: Array<{ flavor: { name: string }; potency: number }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/berry?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total berries: ${all.length}`);

  const results = await Promise.allSettled(all.map((b) => limit(() => fetchWithRetry(b.url))));
  const details: BerryDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as BerryDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const berryRows: [
    number,
    string,
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    number | null,
    string | null,
    number | null,
  ][] = [];
  const flavorRows: [number, string, number][] = [];

  for (const d of details) {
    const itemId = d.item ? extractId(d.item.url) : null;
    const naturalGiftTypeId = d.natural_gift_type ? extractId(d.natural_gift_type.url) : null;

    berryRows.push([
      d.id,
      d.name,
      itemId,
      d.growth_time ?? null,
      d.max_harvest ?? null,
      d.natural_gift_power ?? null,
      d.size ?? null,
      d.smoothness ?? null,
      d.soil_dryness ?? null,
      d.firmness?.name ?? null,
      naturalGiftTypeId,
    ]);

    for (const f of d.flavors ?? []) flavorRows.push([d.id, f.flavor.name, f.potency]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (berryRows.length)
      await conn.query(
        `INSERT INTO berry (id, name, item_id, growth_time, max_harvest, natural_gift_power, size, smoothness,
                                    soil_dryness, firmness, natural_gift_type_id)
                 VALUES ? ON DUPLICATE KEY
                 UPDATE
                     growth_time=
                 VALUES (growth_time), max_harvest=
                 VALUES (max_harvest), natural_gift_power=
                 VALUES (natural_gift_power), size =
                 VALUES (size), smoothness=
                 VALUES (smoothness), soil_dryness=
                 VALUES (soil_dryness), firmness=
                 VALUES (firmness), natural_gift_type_id=
                 VALUES (natural_gift_type_id)`,
        [berryRows],
      );

    if (flavorRows.length)
      await conn.query(
        'INSERT INTO berry_flavor (berry_id, flavor, potency) VALUES ? ON DUPLICATE KEY UPDATE potency=VALUES(potency)',
        [flavorRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL BERRIES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
