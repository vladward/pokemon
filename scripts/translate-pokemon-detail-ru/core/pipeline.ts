import type { RowDataPacket } from 'mysql2';

import { db } from '../../../lib/db';
import type { TranslationConfig } from './config';
import { translateBatch } from './translator';
import { clearLine, formatTime } from './utils';

const COMMIT_BATCH_SIZE = 25;
const DEFAULT_MAX_TEXT_LENGTH = 2_000;

export type PipelineResult = {
  translated: number;
  filteredOut: number;
  skipped: number;
  failed: number;
};

export type PipelineOptions = {
  force?: boolean;
  signal?: AbortSignal;
};

function renderProgress(label: string, done: number, total: number, elapsedMs: number): string {
  const pct = Math.round((done / total) * 100);
  const eta =
    done > 0 && done < total
      ? ` — ~${formatTime((elapsedMs / done) * (total - done))} left`
      : '';
  return `[${label}] ${done}/${total} (${pct}%) — ${formatTime(elapsedMs)} elapsed${eta}`;
}

export async function runPipeline(
  config: TranslationConfig,
  options: PipelineOptions = {},
): Promise<PipelineResult> {
  console.log(`\n[${config.name}] ${config.description}`);

  if (options.force) {
    await db.query(config.clearQuery);
    console.log(`[${config.name}] Cleared existing Russian translations.`);
  }

  const [rows] = await db.query<(RowDataPacket & { id: number; text: string })[]>(
    config.exportQuery,
  );

  if (rows.length === 0) {
    console.log(`[${config.name}] Already up to date.`);
    return { translated: 0, filteredOut: 0, skipped: 0, failed: 0 };
  }

  const maxLen = config.maxTextLength ?? DEFAULT_MAX_TEXT_LENGTH;
  const validRows = rows.filter(
    (r) => r.text != null && r.text.trim().length > 0 && r.text.length <= maxLen,
  );
  const filteredOut = rows.length - validRows.length;

  if (filteredOut > 0) {
    console.warn(
      `[${config.name}] Filtered out ${filteredOut} entries (empty or >${maxLen} chars).`,
    );
  }

  console.log(`[${config.name}] ${validRows.length} entries to translate.`);

  const startedAt = Date.now();
  let processed = 0;
  let skipped = 0;
  let failed = 0;

  process.stdout.write(clearLine(renderProgress(config.name, 0, validRows.length, 0)));

  for (let i = 0; i < validRows.length; i += COMMIT_BATCH_SIZE) {
    if (options.signal?.aborted) {
      process.stdout.write(`\n[${config.name}] Stopped at ${processed}/${validRows.length}.\n`);
      break;
    }

    const batch = validRows.slice(i, i + COMMIT_BATCH_SIZE);
    const results = await translateBatch(batch.map((r) => r.text));

    const seedRows: unknown[][] = [];
    for (let j = 0; j < batch.length; j++) {
      const result = results[j];

      if (result === null) {
        failed++;
        continue;
      }

      const text = result.trim();
      if (!text) {
        process.stdout.write(`\n  [warn] Empty translation for id ${batch[j].id} — skipping\n`);
        skipped++;
        continue;
      }

      seedRows.push(config.buildRow(batch[j].id, text));
    }

    if (seedRows.length > 0) {
      const conn = await db.getConnection();
      try {
        await conn.beginTransaction();
        await conn.query(config.seedQuery, [seedRows]);
        await conn.commit();
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    }

    processed += batch.length;
    process.stdout.write(
      clearLine(renderProgress(config.name, processed, validRows.length, Date.now() - startedAt)),
    );
  }

  const translated = processed - skipped - failed;
  const elapsed = formatTime(Date.now() - startedAt);
  process.stdout.write(clearLine(`[${config.name}] ${translated} translated in ${elapsed}`));
  process.stdout.write('\n');

  return { translated, filteredOut, skipped, failed };
}
