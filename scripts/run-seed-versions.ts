import 'dotenv/config';

import { db } from '../lib/db';

import { POKEAPI, extractId, fetchWithRetry, limit } from './seed-utils';

interface VersionDetail {
  id: number;
  name: string;
  version_group: { url: string } | null;
  names: Array<{ language: { name: string }; name: string }>;
}

async function run(): Promise<void> {
  const listRes = await fetchWithRetry(`${POKEAPI}/version?limit=100`);
  const all = listRes.results as Array<{ name: string; url: string }>;
  console.log(`Total versions: ${all.length}`);

  const results = await Promise.allSettled(all.map((v) => limit(() => fetchWithRetry(v.url))));
  const details: VersionDetail[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') details.push(r.value as unknown as VersionDetail);
    else console.log('Failed:', r.reason?.message);
  }

  const versionRows: [number, string, number | null][] = [];
  const nameRows: [number, string, string][] = [];

  for (const d of details) {
    versionRows.push([d.id, d.name, d.version_group ? extractId(d.version_group.url) : null]);

    for (const n of d.names ?? []) nameRows.push([d.id, n.language.name, n.name]);
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    if (versionRows.length)
      await conn.query(
        'INSERT INTO version (id, name, version_group_id) VALUES ? ON DUPLICATE KEY UPDATE version_group_id=VALUES(version_group_id)',
        [versionRows],
      );

    if (nameRows.length)
      await conn.query(
        'INSERT INTO version_name (version_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name=VALUES(name)',
        [nameRows],
      );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  console.log('DONE ALL VERSIONS');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
