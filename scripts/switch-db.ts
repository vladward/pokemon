import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

type DbTarget = 'docker' | 'tidb';

const ENV_KEY: Record<DbTarget, string> = {
  docker: 'DATABASE_URL_DOCKER',
  tidb: 'DATABASE_URL_TIDB',
};

const target = process.argv[2] as DbTarget;
if (!ENV_KEY[target]) {
  console.error('Usage: switch-db <docker|tidb>');
  process.exit(1);
}

const envPath = resolve('.env');
const content = readFileSync(envPath, 'utf-8');

const envKey = ENV_KEY[target];
const urlMatch = content.match(new RegExp(`^${envKey}="?([^"\\n]+)"?`, 'm'));
if (!urlMatch) {
  console.error(`${envKey} not found in .env`);
  process.exit(1);
}

const rawUrl = urlMatch[1];
if (/<[^>]+>/.test(rawUrl)) {
  console.error(`\n${envKey} still contains template placeholders: ${rawUrl}`);
  console.error(`Fill in the real credentials in .env and retry.\n`);
  process.exit(1);
}

let parsed: URL;
try {
  parsed = new URL(rawUrl);
} catch {
  console.error(`${envKey} is not a valid URL: ${rawUrl}`);
  process.exit(1);
}

const host = parsed.hostname;
const port = parsed.port || '3306';
const user = decodeURIComponent(parsed.username);
const password = decodeURIComponent(parsed.password);
const name = parsed.pathname.replace(/^\//, '').split('?')[0];

const replacements: [RegExp, string][] = [
  [/^DATABASE_URL="[^"]*"/m, `DATABASE_URL="${rawUrl}"`],
  [/^DB_HOST=.*/m, `DB_HOST=${host}`],
  [/^DB_PORT=.*/m, `DB_PORT=${port}`],
  [/^DB_USER=.*/m, `DB_USER=${user}`],
  [/^DB_PASSWORD=.*/m, `DB_PASSWORD=${password}`],
  [/^DB_NAME=.*/m, `DB_NAME=${name}`],
];

let updated = content;
for (const [pattern, replacement] of replacements) {
  updated = updated.replace(pattern, replacement);
}

writeFileSync(envPath, updated);
console.log(`Switched to ${target}: ${host}:${port}/${name}`);
console.log('Restart the dev server for changes to take effect.');
