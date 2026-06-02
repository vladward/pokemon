import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

// PokeAPI damage_relations factor mapping
const DAMAGE_FACTOR: Record<string, number> = {
  no_damage_to: 0,
  half_damage_to: 50,
  double_damage_to: 200,
};

interface TypeDetail {
  id: number;
  name: string;
  generation: { url: string } | null;
  move_damage_class: { name: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
  damage_relations: Record<string, Array<{ name: string; url: string }>>;
  past_damage_relations: Array<{
    generation: { name: string; url: string };
    damage_relations: Record<string, Array<{ name: string; url: string }>>;
  }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/type?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total types: ${all.length}`);

  const results = await Promise.allSettled(all.map((t) => limit(() => fetchWithRetry(t.url))));
  const details: TypeDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as TypeDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const typeRows: [number, string, number | null, string | null][] = [];
  const nameRows: [number, string, string][] = [];
  const efficacyRows: [number, number, number][] = [];
  const pastEfficacyRows: [number, number, number, number][] = [];
  const genRows: [number, string][] = [];
  const genSeen = new Set<number>();

  for (const d of details) {
    typeRows.push([
      d.id,
      d.name,
      d.generation ? extractId(d.generation.url) : null,
      d.move_damage_class?.name ?? null,
    ]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);

    // Current damage relations: from this type → other types
    for (const [key, factor] of Object.entries(DAMAGE_FACTOR)) {
      for (const target of d.damage_relations[key] ?? []) {
        efficacyRows.push([d.id, extractId(target.url), factor]);
      }
    }

    // Past damage relations (e.g. Steel had different immunities before Gen 6)
    for (const past of d.past_damage_relations ?? []) {
      const genId = extractId(past.generation.url);
      if (!genSeen.has(genId)) {
        genRows.push([genId, past.generation.name]);
        genSeen.add(genId);
      }
      for (const [key, factor] of Object.entries(DAMAGE_FACTOR)) {
        for (const target of past.damage_relations[key] ?? []) {
          pastEfficacyRows.push([d.id, extractId(target.url), genId, factor]);
        }
      }
    }
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (genRows.length)
      await conn.query(
        'INSERT INTO generation (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [genRows],
      );

    if (typeRows.length)
      await conn.query(
        'INSERT INTO `type` (id, name, generation_id, move_damage_class) VALUES ? ON DUPLICATE KEY UPDATE generation_id=VALUES(generation_id), move_damage_class=VALUES(move_damage_class)',
        [typeRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO type_name (type_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    if (efficacyRows.length)
      await conn.query(
        'INSERT INTO type_efficacy (from_type_id, to_type_id, damage_factor) VALUES ? ON DUPLICATE KEY UPDATE damage_factor=VALUES(damage_factor)',
        [efficacyRows],
      );

    if (pastEfficacyRows.length)
      await conn.query(
        'INSERT INTO type_past_efficacy (from_type_id, to_type_id, generation_id, damage_factor) VALUES ? ON DUPLICATE KEY UPDATE damage_factor=VALUES(damage_factor)',
        [pastEfficacyRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL TYPES');
}

// type table needs move_damage_class column — add it safely
async function ensureColumns(): Promise<void> {
  const alters = [
    'ALTER TABLE `type` ADD COLUMN `generation_id` int DEFAULT NULL',
    'ALTER TABLE `type` ADD COLUMN `move_damage_class` varchar(20) DEFAULT NULL',
  ];
  for (const sql of alters) {
    try {
      await db.query(sql);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException & { code?: string }).code !== 'ER_DUP_FIELDNAME') throw err;
    }
  }
}

ensureColumns()
  .then(() => run())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
