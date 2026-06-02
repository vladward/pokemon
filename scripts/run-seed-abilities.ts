import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

import { POKEAPI, clean, extractId, fetchWithRetry, limit } from './seed-utils';

const STATE_ID = 'abilities_offset';
const BATCH_SIZE = 50;

interface AbilityDetail {
  id: number;
  name: string;
  generation: { url: string } | null;
  is_main_series: boolean | null;
  names: Array<{ language: { name: string }; name: string }>;
  effect_entries: Array<{ language: { name: string }; short_effect: string; effect: string }>;
  flavor_text_entries: Array<{
    language: { name: string };
    version_group: { name: string; url: string };
    flavor_text: string;
  }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/ability?limit=10000`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total abilities: ${all.length}`);

  const [stateRows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [STATE_ID],
  );
  let offset = stateRows.length ? stateRows[0].value : 0;
  console.log(`Resume from: ${offset}`);

  for (; offset < all.length; offset += BATCH_SIZE) {
    console.log(`\nBatch: ${offset}`);
    const batch = all.slice(offset, offset + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((a) => limit(() => fetchWithRetry(a.url))));
    const details: AbilityDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as AbilityDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const abilityRows: [number, string, number | null, boolean | null][] = [];
    const nameRows: [number, string, string][] = [];
    const effectRows: [number, string, string, string][] = [];
    const flavorRows: [number, string, number, string][] = [];
    const vgRows: [number, string][] = [];
    const vgSeen = new Set<number>();

    for (const d of details) {
      abilityRows.push([
        d.id,
        d.name,
        d.generation ? extractId(d.generation.url) : null,
        d.is_main_series ?? null,
      ]);

      for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);

      for (const e of d.effect_entries ?? [])
        effectRows.push([
          d.id,
          e.language.name,
          clean(e.short_effect ?? ''),
          clean(e.effect ?? ''),
        ]);

      for (const ft of d.flavor_text_entries ?? []) {
        const vgId = extractId(ft.version_group.url);
        if (!vgSeen.has(vgId)) {
          vgRows.push([vgId, ft.version_group.name]);
          vgSeen.add(vgId);
        }
        flavorRows.push([d.id, ft.language.name, vgId, clean(ft.flavor_text)]);
      }
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (vgRows.length)
        await conn.query(
          'INSERT INTO version_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [vgRows],
        );

      if (abilityRows.length)
        await conn.query(
          `INSERT INTO ability (id, name, generation_id, is_main_series)
                     VALUES ? ON DUPLICATE KEY
                    UPDATE generation_id=
                    VALUES (generation_id), is_main_series=
                    VALUES (is_main_series)`,
          [abilityRows],
        );

      if (nameRows.length)
        await conn.query(
          'INSERT INTO ability_name (ability_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [nameRows],
        );

      if (effectRows.length)
        await conn.query(
          'INSERT INTO ability_effect (ability_id, language, short_effect, effect) VALUES ? ON DUPLICATE KEY UPDATE short_effect=VALUES(short_effect), effect=VALUES(effect)',
          [effectRows],
        );

      if (flavorRows.length)
        await conn.query(
          'INSERT INTO ability_flavor_text (ability_id, language, version_group_id, flavor_text) VALUES ? ON DUPLICATE KEY UPDATE flavor_text=VALUES(flavor_text)',
          [flavorRows],
        );

      await conn.query(
        'INSERT INTO seed_state (id, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)',
        [STATE_ID, offset + BATCH_SIZE],
      );
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    console.log(`Batch done: ${offset}`);
  }

  console.log('DONE ALL ABILITIES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
