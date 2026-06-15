import fs from 'node:fs';
import path from 'node:path';

import pLimit from 'p-limit';

const logsDir = path.join(process.cwd(), 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const scriptName = path.basename(process.argv[1] ?? 'seed', '.ts');
const ts = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
const logFile = path.join(logsDir, `${scriptName}_${ts}.log`);

function writeLine(msg: string) {
  try {
    fs.appendFileSync(logFile, msg + '\n');
  } catch {}
}

const _log = console.log.bind(console);
const _error = console.error.bind(console);

function level(text: string): string {
  if (/^DONE\b/.test(text)) return '[SUCCESS]';
  if (/^(Failed|429|Fetch failed|rate.limited)/i.test(text)) return '[WARN]   ';
  return '[INFO]   ';
}

console.log = (...args: unknown[]) => {
  const text = args.map(String).join(' ');
  const m = `[${new Date().toISOString()}] ${level(text)} ${text}`;
  _log(m);
  writeLine(m);
};
console.error = (...args: unknown[]) => {
  const m = `[${new Date().toISOString()}] [ERROR]   ${args.map(String).join(' ')}`;
  _error(m);
  writeLine(m);
};

writeLine(`\n${'='.repeat(60)}`);
writeLine(`[${new Date().toISOString()}] [START]   ${scriptName}`);
writeLine(`[${new Date().toISOString()}] [INFO]    Log: ${logFile}`);

export const POKEAPI = 'https://pokeapi.co/api/v2';

export const limit = pLimit(5);

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function fetchWithRetry(
  url: string,
  retries = 5,
  rateRetries = 10,
): Promise<Record<string, unknown>> {
  try {
    const res = await fetch(url);

    if (res.status === 429) {
      if (rateRetries <= 0) throw new Error(`429 rate-limit: max retries exceeded: ${url}`);
      const waitSec = Number(res.headers.get('Retry-After') ?? 60);
      console.log(`429 rate-limited — pausing ${waitSec}s (${rateRetries} left): ${url}`);
      await sleep(waitSec * 1000);
      return fetchWithRetry(url, retries, rateRetries - 1);
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
    return await res.json();
  } catch (err: unknown) {
    if (retries > 0) {
      const delay = 1000 * (6 - retries);
      console.log(`Fetch failed (${retries} left, retry in ${delay}ms): ${url}`);
      await sleep(delay);
      return fetchWithRetry(url, retries - 1, rateRetries);
    }
    throw err;
  }
}

export function extractId(url: string): number {
  return Number(url.split('/').filter(Boolean).pop());
}

export function clean(text: string): string {
  return text.replace(/[\f\n\r]/g, ' ').trim();
}
