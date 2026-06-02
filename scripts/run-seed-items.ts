import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

import { POKEAPI, clean, extractId, fetchWithRetry, limit } from './seed-utils';

const STATE_ID = 'items_offset';
const BATCH_SIZE = 50;

interface ItemDetail {
  id: number;
  name: string;
  cost: number | null;
  fling_power: number | null;
  fling_effect: { name: string } | null;
  category: { name: string; url: string } | null;
  sprites: { default: string | null } | null;
  attributes: Array<{ name: string; url: string }>;
  names: Array<{ language: { name: string }; name: string }>;
  effect_entries: Array<{ language: { name: string }; short_effect: string; effect: string }>;
  flavor_text_entries: Array<{
    language: { name: string };
    version_group: { name: string; url: string };
    text?: string;
    flavor_text?: string;
  }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/item?limit=10000`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total items: ${all.length}`);

  const [stateRows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [STATE_ID],
  );
  let offset = stateRows.length ? stateRows[0].value : 0;
  console.log(`Resume from: ${offset}`);

  const catSeen = new Set<number>();
  const attrSeen = new Set<number>();

  // Pre-load already-seen cats/attrs from DB
  const [existingCats] = await db.query<(RowDataPacket & { id: number })[]>(
    'SELECT id FROM item_category',
  );
  for (const r of existingCats) catSeen.add(r.id);
  const [existingAttrs] = await db.query<(RowDataPacket & { id: number })[]>(
    'SELECT id FROM item_attribute',
  );
  for (const r of existingAttrs) attrSeen.add(r.id);

  for (; offset < all.length; offset += BATCH_SIZE) {
    console.log(`\nBatch: ${offset}`);
    const batch = all.slice(offset, offset + BATCH_SIZE);

    const results = await Promise.allSettled(batch.map((i) => limit(() => fetchWithRetry(i.url))));
    const details: ItemDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as ItemDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const itemRows: [
      number,
      string,
      number | null,
      number | null,
      string | null,
      number | null,
      string | null,
    ][] = [];
    const catRows: [number, string][] = [];
    const attrRows: [number, string][] = [];
    const toAttrRows: [number, number][] = [];
    const nameRows: [number, string, string][] = [];
    const effectRows: [number, string, string, string][] = [];
    const flavorRows: [number, string, number, string][] = [];
    const vgRows: [number, string][] = [];
    const vgSeen = new Set<number>();

    for (const d of details) {
      let catId: number | null = null;
      if (d.category) {
        catId = extractId(d.category.url);
        if (!catSeen.has(catId)) {
          catRows.push([catId, d.category.name]);
          catSeen.add(catId);
        }
      }

      itemRows.push([
        d.id,
        d.name,
        d.cost ?? null,
        d.fling_power ?? null,
        d.fling_effect?.name ?? null,
        catId,
        d.sprites?.default ?? null,
      ]);

      for (const attr of d.attributes ?? []) {
        const attrId = extractId(attr.url);
        if (!attrSeen.has(attrId)) {
          attrRows.push([attrId, attr.name]);
          attrSeen.add(attrId);
        }
        toAttrRows.push([d.id, attrId]);
      }

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
        flavorRows.push([d.id, ft.language.name, vgId, clean(ft.text ?? ft.flavor_text ?? '')]);
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

      if (catRows.length)
        await conn.query(
          'INSERT INTO item_category (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [catRows],
        );

      if (attrRows.length)
        await conn.query(
          'INSERT INTO item_attribute (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [attrRows],
        );

      if (itemRows.length)
        await conn.query(
          `INSERT INTO item (id, name, cost, fling_power, fling_effect, category_id, sprite_url)
                     VALUES ? ON DUPLICATE KEY
                     UPDATE
                         cost=
                     VALUES (cost), fling_power=
                     VALUES (fling_power), fling_effect=
                     VALUES (fling_effect), category_id=
                     VALUES (category_id), sprite_url=
                     VALUES (sprite_url)`,
          [itemRows],
        );

      if (toAttrRows.length)
        await conn.query('INSERT IGNORE INTO item_to_attribute (item_id, attribute_id) VALUES ?', [
          toAttrRows,
        ]);

      if (nameRows.length)
        await conn.query(
          'INSERT INTO item_name (item_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [nameRows],
        );

      if (effectRows.length)
        await conn.query(
          'INSERT INTO item_effect (item_id, language, short_effect, effect) VALUES ? ON DUPLICATE KEY UPDATE short_effect=VALUES(short_effect), effect=VALUES(effect)',
          [effectRows],
        );

      if (flavorRows.length)
        await conn.query(
          'INSERT INTO item_flavor_text (item_id, language, version_group_id, flavor_text) VALUES ? ON DUPLICATE KEY UPDATE flavor_text=VALUES(flavor_text)',
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

  console.log('DONE ALL ITEMS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
