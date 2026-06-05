import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

type DbTarget = 'docker' | 'tidb';

interface DbConfig {
  url: string;
  host: string;
  port: string;
  user: string;
  password: string;
  name: string;
}

const configs: Record<DbTarget, DbConfig> = {
  docker: {
    url: 'DATABASE_URL_DOCKER',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    name: 'pokemon',
  },
  tidb: {
    url: 'DATABASE_URL_TIDB',
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    port: '4000',
    user: 'KeyRbT984oi7e1P.root',
    password: 'v8cJQQ4rN7hqMfdM',
    name: 'test',
  },
};

const target = process.argv[2] as DbTarget;
if (!configs[target]) {
  console.error('Usage: switch-db <docker|tidb>');
  process.exit(1);
}

const cfg = configs[target];
const envPath = resolve('.env');
let content = readFileSync(envPath, 'utf-8');

const urlMatch = content.match(new RegExp(`^${cfg.url}="?([^"\\n]+)"?`, 'm'));
if (!urlMatch) {
  console.error(`${cfg.url} not found in .env`);
  process.exit(1);
}

const replacements: [RegExp, string][] = [
  [/^DATABASE_URL="[^"]*"/m, `DATABASE_URL="${urlMatch[1]}"`],
  [/^DB_HOST=.*/m, `DB_HOST=${cfg.host}`],
  [/^DB_PORT=.*/m, `DB_PORT=${cfg.port}`],
  [/^DB_USER=.*/m, `DB_USER=${cfg.user}`],
  [/^DB_PASSWORD=.*/m, `DB_PASSWORD=${cfg.password}`],
  [/^DB_NAME=.*/m, `DB_NAME=${cfg.name}`],
];

for (const [pattern, replacement] of replacements) {
  content = content.replace(pattern, replacement);
}

writeFileSync(envPath, content);
console.log(`Switched to ${target}`);
