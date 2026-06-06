import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

import { db } from '../lib/db';

import './seed-utils';

// Species names:  scripts/pokemon-names/{lang}.json     → { "species_id": "name" }
// Form names:     scripts/pokemon-names/{lang}-forms.json → { "form_id": "name" }
const NAMES_DIR = path.join(process.cwd(), 'scripts', 'pokemon-names');
const LANGUAGES = ['ru'] as const;

async function run(): Promise<void> {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    for (const lang of LANGUAGES) {
      // --- species names ---
      const speciesPath = path.join(NAMES_DIR, `${lang}.json`);
      if (!fs.existsSync(speciesPath)) {
        console.log(`Skipping ${lang} species: file not found`);
      } else {
        const data: Record<string, string> = JSON.parse(fs.readFileSync(speciesPath, 'utf-8'));
        const entries = Object.entries(data);
        if (!entries.length) {
          console.log(`Skipping ${lang} species: empty file`);
        } else {
          const rows: [number, string, string][] = entries.map(([id, name]) => [Number(id), lang, name]);
          await conn.query(
            'INSERT INTO pokemon_species_name (species_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
            [rows],
          );
          console.log(`DONE ${lang} species: ${rows.length} names inserted`);
        }
      }

      // --- form names ---
      const formsPath = path.join(NAMES_DIR, `${lang}-forms.json`);
      if (!fs.existsSync(formsPath)) {
        console.log(`Skipping ${lang} forms: file not found`);
      } else {
        const data: Record<string, string> = JSON.parse(fs.readFileSync(formsPath, 'utf-8'));
        const entries = Object.entries(data);
        if (!entries.length) {
          console.log(`Skipping ${lang} forms: empty file`);
        } else {
          const rows: [number, string, string][] = entries.map(([id, name]) => [Number(id), lang, name]);
          await conn.query(
            'INSERT INTO pokemon_form_name (form_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
            [rows],
          );
          console.log(`DONE ${lang} forms: ${rows.length} names inserted`);
        }
      }
    }

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.end());
