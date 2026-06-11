import pLimit from 'p-limit';

import { formatTime } from './utils';

const REQUEST_DELAY_MS = 3_000;
const REQUEST_JITTER_MS = 1_000;
const MAX_RETRIES = 3;
const RETRY_DELAYS_MS = [10_000, 20_000, 40_000] as const;
const BATCH_SEP = '\n\n';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

export class TranslatorUnavailableError extends Error {
  constructor(reason: string, cause?: unknown) {
    super(`Google Translate unavailable: ${reason}`);
    this.cause = cause;
  }
}

export async function checkAvailable(): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5_000);
  try {
    const res = await fetch('https://translate.googleapis.com', {
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!res.ok && res.status !== 404) {
      throw new TranslatorUnavailableError(`HTTP ${res.status}`);
    }
  } catch (err) {
    if (err instanceof TranslatorUnavailableError) throw err;
    throw new TranslatorUnavailableError('network error', err);
  } finally {
    clearTimeout(timer);
  }
}

function pause(): Promise<void> {
  return new Promise((r) => setTimeout(r, REQUEST_DELAY_MS + Math.random() * REQUEST_JITTER_MS));
}

async function httpTranslate(q: string, from: string, to: string): Promise<string> {
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', from);
  url.searchParams.set('tl', to);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', q);

  const res = await fetch(url.toString(), { headers: { 'User-Agent': USER_AGENT } });

  if (!res.ok) {
    const error = new Error(`HTTP ${res.status}`);
    (error as Error & { status: number }).status = res.status;
    throw error;
  }

  const data = (await res.json()) as unknown[][][];
  return (data[0] as [string][]).map((item) => item[0]).join('');
}

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === MAX_RETRIES) throw err;
      const delayMs = RETRY_DELAYS_MS[attempt];
      const isRateLimit = (err as { status?: number }).status === 429;
      process.stdout.write(
        `\n  [${isRateLimit ? 'rate limit' : `retry ${attempt + 1}/${MAX_RETRIES}`}] waiting ${formatTime(delayMs)}...\n`,
      );
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error('unreachable');
}

async function translateBatchRequest(texts: string[], from: string, to: string): Promise<string[]> {
  const sanitized = texts.map((t) => t.replace(/\r?\n/g, ' ').trim());
  const translated = await withRetry(() => httpTranslate(sanitized.join(BATCH_SEP), from, to));
  const parts = translated.split(BATCH_SEP);

  if (parts.length !== texts.length) {
    throw new Error(`Batch split mismatch: expected ${texts.length}, got ${parts.length}`);
  }

  return parts.map((p) => p.trim());
}

async function translateIndividual(text: string, from: string, to: string): Promise<string> {
  return withRetry(() => httpTranslate(text.replace(/\r?\n/g, ' ').trim(), from, to));
}

export async function translateBatch(
  texts: string[],
  from = 'en',
  to = 'ru',
): Promise<(string | null)[]> {
  try {
    const results = await translateBatchRequest(texts, from, to);
    await pause();
    return results.map((t) => t || null);
  } catch {
    // Batch failed (split mismatch or error) — fall back to individual translations
    const limit = pLimit(1);
    return Promise.all(
      texts.map((text) =>
        limit(async () => {
          try {
            const result = await translateIndividual(text, from, to);
            await pause();
            return result || null;
          } catch (err) {
            process.stdout.write(
              `\n  [fail] "${text.slice(0, 60)}": ${(err as Error).message}\n`,
            );
            return null;
          }
        }),
      ),
    );
  }
}
