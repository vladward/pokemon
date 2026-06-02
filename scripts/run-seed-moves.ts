import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

import { POKEAPI, clean, extractId, fetchWithRetry, limit } from './seed-utils';

const STATE_ID = 'moves_offset';
const BATCH_SIZE = 50;

interface MoveDetail {
  id: number;
  name: string;
  power: number | null;
  pp: number | null;
  accuracy: number | null;
  priority: number;
  effect_chance: number | null;
  type: { url: string } | null;
  damage_class: { name: string } | null;
  target: { name: string } | null;
  contest_type: { name: string } | null;
  generation: { url: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
  effect_entries: Array<{ language: { name: string }; short_effect: string; effect: string }>;
  flavor_text_entries: Array<{
    language: { name: string };
    version_group: { name: string; url: string };
    flavor_text: string;
  }>;
  meta: {
    ailment: { name: string } | null;
    category: { name: string } | null;
    min_hits: number | null;
    max_hits: number | null;
    min_turns: number | null;
    max_turns: number | null;
    drain: number;
    healing: number;
    crit_rate: number;
    ailment_chance: number;
    flinch_chance: number;
    stat_chance: number;
  } | null;
  stat_changes: Array<{ stat: { name: string }; change: number }>;
  past_values: Array<{
    version_group: { name: string; url: string } | null;
    power: number | null;
    pp: number | null;
    accuracy: number | null;
    effect_chance: number | null;
    type: { url: string } | null;
  }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/move?limit=10000`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total moves: ${all.length}`);

  const [stateRows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [STATE_ID],
  );
  let offset = stateRows.length ? stateRows[0].value : 0;
  console.log(`Resume from: ${offset}`);

  for (; offset < all.length; offset += BATCH_SIZE) {
    console.log(`\nBatch: ${offset}`);
    const batch = all.slice(offset, offset + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((m) => limit(() => fetchWithRetry(m.url))));
    const details: MoveDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as MoveDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const moveRows: [
      number,
      string,
      number | null,
      number | null,
      number | null,
      number,
      number | null,
      number | null,
      string | null,
      string | null,
      string | null,
      number | null,
    ][] = [];
    const nameRows: [number, string, string][] = [];
    const effectRows: [number, string, string, string][] = [];
    const flavorRows: [number, string, number, string][] = [];
    const metaRows: [
      number,
      string | null,
      string | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number,
      number,
      number,
      number,
      number,
      number,
    ][] = [];
    const statChangeRows: [number, string, number][] = [];
    const pastValueRows: [
      number,
      number,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
    ][] = [];
    const vgRows: [number, string][] = [];
    const vgSeen = new Set<number>();

    for (const d of details) {
      moveRows.push([
        d.id,
        d.name,
        d.power ?? null,
        d.pp ?? null,
        d.accuracy ?? null,
        d.priority ?? 0,
        d.effect_chance ?? null,
        d.type ? extractId(d.type.url) : null,
        d.damage_class?.name ?? null,
        d.target?.name ?? null,
        d.contest_type?.name ?? null,
        d.generation ? extractId(d.generation.url) : null,
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

      if (d.meta) {
        metaRows.push([
          d.id,
          d.meta.ailment?.name ?? null,
          d.meta.category?.name ?? null,
          d.meta.min_hits ?? null,
          d.meta.max_hits ?? null,
          d.meta.min_turns ?? null,
          d.meta.max_turns ?? null,
          d.meta.drain ?? 0,
          d.meta.healing ?? 0,
          d.meta.crit_rate ?? 0,
          d.meta.ailment_chance ?? 0,
          d.meta.flinch_chance ?? 0,
          d.meta.stat_chance ?? 0,
        ]);
      }

      for (const sc of d.stat_changes ?? []) statChangeRows.push([d.id, sc.stat.name, sc.change]);

      for (const pv of d.past_values ?? []) {
        if (!pv.version_group) continue;
        const vgId = extractId(pv.version_group.url);
        if (!vgSeen.has(vgId)) {
          vgRows.push([vgId, pv.version_group.name]);
          vgSeen.add(vgId);
        }
        pastValueRows.push([
          d.id,
          vgId,
          pv.power ?? null,
          pv.pp ?? null,
          pv.accuracy ?? null,
          pv.effect_chance ?? null,
          pv.type ? extractId(pv.type.url) : null,
        ]);
      }
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (vgRows.length)
        await conn.query(
          'INSERT INTO version_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [vgRows],
        );

      if (moveRows.length)
        await conn.query(
          `INSERT INTO move (id, name, power, pp, accuracy, priority, effect_chance, type_id, damage_class,
                                       target, contest_type, generation_id)
                     VALUES ? ON DUPLICATE KEY
                    UPDATE
                        power=
                    VALUES (power), pp=
                    VALUES (pp), accuracy=
                    VALUES (accuracy), priority=
                    VALUES (priority), effect_chance=
                    VALUES (effect_chance), type_id=
                    VALUES (type_id), damage_class=
                    VALUES (damage_class), target=
                    VALUES (target), contest_type=
                    VALUES (contest_type), generation_id=
                    VALUES (generation_id)`,
          [moveRows],
        );

      if (nameRows.length)
        await conn.query(
          'INSERT INTO move_name (move_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [nameRows],
        );

      if (effectRows.length)
        await conn.query(
          'INSERT INTO move_effect (move_id, language, short_effect, effect) VALUES ? ON DUPLICATE KEY UPDATE short_effect=VALUES(short_effect), effect=VALUES(effect)',
          [effectRows],
        );

      if (flavorRows.length)
        await conn.query(
          'INSERT INTO move_flavor_text (move_id, language, version_group_id, flavor_text) VALUES ? ON DUPLICATE KEY UPDATE flavor_text=VALUES(flavor_text)',
          [flavorRows],
        );

      if (metaRows.length)
        await conn.query(
          `INSERT INTO move_meta (move_id, ailment, category, min_hits, max_hits, min_turns, max_turns, drain,
                                            healing, crit_rate, ailment_chance, flinch_chance, stat_chance)
                     VALUES ? ON DUPLICATE KEY
                    UPDATE
                        ailment=
                    VALUES (ailment), category=
                    VALUES (category), drain=
                    VALUES (drain), healing=
                    VALUES (healing)`,
          [metaRows],
        );

      if (statChangeRows.length)
        await conn.query(
          'INSERT INTO move_stat_change (move_id, stat_name, `change`) VALUES ? ON DUPLICATE KEY UPDATE `change`=VALUES(`change`)',
          [statChangeRows],
        );

      if (pastValueRows.length)
        await conn.query(
          'INSERT INTO move_past_value (move_id, version_group_id, power, pp, accuracy, effect_chance, type_id) VALUES ? ON DUPLICATE KEY UPDATE power=VALUES(power), pp=VALUES(pp)',
          [pastValueRows],
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

  console.log('DONE ALL MOVES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
