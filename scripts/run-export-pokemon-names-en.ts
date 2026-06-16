import fs from 'node:fs';
import path from 'node:path';

import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

const NAMES_DIR = path.join(process.cwd(), 'scripts', 'pokemon-names');

async function run(): Promise<void> {
  fs.mkdirSync(NAMES_DIR, { recursive: true });

  const [rows] = await db.query<(RowDataPacket & { species_id: number; name: string })[]>(
    'SELECT species_id, name FROM pokemon_species_name WHERE language = "en" ORDER BY species_id',
  );

  const result: Record<string, string> = {};
  for (const row of rows) {
    result[String(row.species_id)] = row.name;
  }

  const outPath = path.join(NAMES_DIR, 'en.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Exported ${rows.length} English names → ${outPath}`);
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
