import fs from 'node:fs';
import path from 'node:path';

import 'dotenv/config';
import type { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

const NAMES_DIR = path.join(process.cwd(), 'scripts', 'pokemon-names');

async function run(): Promise<void> {
  fs.mkdirSync(NAMES_DIR, { recursive: true });

  // Export variant pokemon (pokemon.is_default=0): form name if exists, else pokemon slug
  // These are the pokemon that need unique display names (e.g. pikachu-rock-star)
  const [rows] = await db.query<(RowDataPacket & { form_id: number; name: string })[]>(`
        SELECT pf.id AS form_id, COALESCE(pfn.name, p.name) AS name
        FROM pokemon p
                 JOIN pokemon_form pf ON pf.pokemon_id = p.id AND pf.is_default = 1
                 LEFT JOIN pokemon_form_name pfn ON pfn.form_id = pf.id AND pfn.language = 'en'
        WHERE p.is_default = 0
        ORDER BY pf.id
    `);

  const result: Record<string, string> = {};
  for (const row of rows) {
    result[String(row.form_id)] = row.name;
  }

  const outPath = path.join(NAMES_DIR, 'en-forms.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`Exported ${rows.length} English form names → ${outPath}`);
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
