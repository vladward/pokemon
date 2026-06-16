import 'dotenv/config';

import { db } from '../../lib/db';

import { config as abilityEffects } from './configs/ru-pokemon-ability-effects';
import { config as abilityNames } from './configs/ru-pokemon-ability-names';
import { config as eggGroupNames } from './configs/ru-pokemon-egg-group-names';
import { config as flavorTexts } from './configs/ru-pokemon-flavor-texts';
import { config as genus } from './configs/ru-pokemon-genus';
import { config as locationNames } from './configs/ru-pokemon-location-names';
import { config as typeNames } from './configs/ru-pokemon-type-names';
import type { PipelineResult } from './core/pipeline';
import { runPipeline } from './core/pipeline';
import { TranslatorUnavailableError, checkAvailable } from './core/translator';
import { formatTime } from './core/utils';

const ALL_CONFIGS = [
  typeNames,
  eggGroupNames,
  abilityNames,
  genus,
  abilityEffects,
  flavorTexts,
  locationNames,
];

const CONFIG_MAP = Object.fromEntries(ALL_CONFIGS.map((c) => [c.name, c]));

function printUsage() {
  console.log(
    'Translates Pokémon detail page data to Russian (incremental — skips already translated).',
  );
  console.log('\nUsage:');
  console.log('  npm run translate:pokemon-detail-ru                          — translate all');
  console.log(
    '  npm run translate:pokemon-detail-ru -- --table <name>        — translate one table',
  );
  console.log('  npm run translate:pokemon-detail-ru -- --force               — re-translate all');
  console.log(
    '  npm run translate:pokemon-detail-ru -- --force --table <name>— re-translate one table',
  );
  console.log('\nAvailable tables:');
  for (const c of ALL_CONFIGS) {
    console.log(`  ${c.name.padEnd(30)} ${c.description}`);
  }
}

type RunResult = PipelineResult & { name: string };

function printSummary(results: RunResult[], totalMs: number) {
  const totalTranslated = results.reduce((s, r) => s + r.translated, 0);

  if (totalTranslated === 0 && results.every((r) => r.failed === 0)) {
    console.log('\nAll Russian translations are up to date.');
    return;
  }

  console.log('\n' + '─'.repeat(54));
  for (const r of results) {
    if (r.translated === 0 && r.skipped === 0 && r.filteredOut === 0 && r.failed === 0) continue;
    const notes = [
      r.failed > 0 && `${r.failed} failed`,
      r.skipped > 0 && `${r.skipped} skipped`,
      r.filteredOut > 0 && `${r.filteredOut} filtered`,
    ]
      .filter(Boolean)
      .join(', ');
    console.log(
      `  ${r.name.padEnd(30)} ${String(r.translated).padStart(5)} translated${notes ? ` (${notes})` : ''}`,
    );
  }
  console.log('─'.repeat(54));
  console.log(
    `  ${'Total'.padEnd(30)} ${String(totalTranslated).padStart(5)} translated in ${formatTime(totalMs)}`,
  );
  console.log('─'.repeat(54));
}

async function main() {
  const args = process.argv.slice(2);
  const tableIdx = args.indexOf('--table');
  const tableName = tableIdx !== -1 ? args[tableIdx + 1] : undefined;
  const force = args.includes('--force');

  if (tableIdx !== -1 && (tableName === undefined || tableName.startsWith('--'))) {
    console.error('--table requires a table name.');
    printUsage();
    process.exit(1);
  }

  if (tableName !== undefined && !CONFIG_MAP[tableName]) {
    console.error(`Unknown table: "${tableName}"`);
    printUsage();
    process.exit(1);
  }

  try {
    await checkAvailable();
  } catch (err) {
    if (err instanceof TranslatorUnavailableError) {
      console.error(`\n[translate] ${err.message}`);
      console.error('            Check your internet connection.\n');
      process.exit(1);
    }
    throw err;
  }

  const controller = new AbortController();
  process.once('SIGINT', () => {
    process.stdout.write('\n[translate] Ctrl+C — finishing current batch then stopping...\n');
    controller.abort();
  });

  const configs = tableName ? [CONFIG_MAP[tableName]] : ALL_CONFIGS;
  const startedAt = Date.now();
  const results: RunResult[] = [];

  for (const config of configs) {
    if (controller.signal.aborted) break;
    const result = await runPipeline(config, { force, signal: controller.signal });
    results.push({ name: config.name, ...result });
  }

  printSummary(results, Date.now() - startedAt);
}

main()
  .catch((err) => {
    console.error('\n[translate] Fatal error:', err.message ?? err);
    process.exit(1);
  })
  .finally(() => db.end());
