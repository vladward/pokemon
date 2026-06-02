import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

const STATE_ID = 'machines_offset';
const BATCH_SIZE = 100;

interface MachineDetail {
  id: number;
  item: { url: string } | null;
  move: { url: string } | null;
  version_group: { name: string; url: string } | null;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/machine?limit=10000`);
  const all = listRes.results as Array<{ url: string }>;
  console.log(`Total machines: ${all.length}`);

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
    const details: MachineDetail[] = [];
    for (const r of results) {
      if (r.status === 'fulfilled') details.push(r.value as unknown as MachineDetail);
      else console.log('Failed:', r.reason?.message);
    }
    if (!details.length) continue;

    const machineRows: [number, number | null, number | null, number | null][] = [];
    const vgRows: [number, string][] = [];
    const vgSeen = new Set<number>();

    for (const d of details) {
      const itemId = d.item ? extractId(d.item.url) : null;
      const moveId = d.move ? extractId(d.move.url) : null;
      let vgId: number | null = null;

      if (d.version_group) {
        vgId = extractId(d.version_group.url);
        if (!vgSeen.has(vgId)) {
          vgRows.push([vgId, d.version_group.name]);
          vgSeen.add(vgId);
        }
      }

      machineRows.push([d.id, itemId, moveId, vgId]);
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (vgRows.length)
        await conn.query(
          'INSERT INTO version_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [vgRows],
        );

      if (machineRows.length)
        await conn.query(
          `INSERT INTO machine (id, item_id, move_id, version_group_id)
                     VALUES ? ON DUPLICATE KEY
                     UPDATE item_id=
                     VALUES (item_id), move_id=
                     VALUES (move_id), version_group_id=
                     VALUES (version_group_id)`,
          [machineRows],
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

  console.log('DONE ALL MACHINES');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
