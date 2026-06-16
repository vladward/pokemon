import fs from 'node:fs/promises';
import path from 'node:path';

import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';
import pLimit from 'p-limit';

import { db } from '../lib/db';

const BASE_GITHUB_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/';
const OUTPUT_ROOT = path.join(process.cwd(), 'public');
const limit = pLimit(10);

async function downloadSprites(): Promise<void> {
  interface SpriteRow extends RowDataPacket {
    pokemon_id: number;
    sprite_name: string;
    url: string;
  }

  const [rows] = await db.query<SpriteRow[]>(
    'SELECT pokemon_id, sprite_name, url FROM pokemon_sprite',
  );
  console.log(`Downloading ${rows.length} sprites...`);

  let done = 0;
  let failed = 0;

  await Promise.all(
    rows.map((row) =>
      limit(async () => {
        const relativePath = row.url.startsWith(BASE_GITHUB_URL)
          ? row.url.slice(BASE_GITHUB_URL.length)
          : `sprites/pokemon/${row.pokemon_id}_${row.sprite_name}.png`;

        const outPath = path.join(OUTPUT_ROOT, relativePath);
        await fs.mkdir(path.dirname(outPath), { recursive: true });

        try {
          const res = await fetch(row.url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buffer = await res.arrayBuffer();
          await fs.writeFile(outPath, Buffer.from(buffer));
          done++;
          if (done % 500 === 0) console.log(`${done}/${rows.length} done`);
        } catch {
          failed++;
        }
      }),
    ),
  );

  console.log(`Done. ${done} downloaded, ${failed} failed.`);
}

downloadSprites()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    db.end();
  });
