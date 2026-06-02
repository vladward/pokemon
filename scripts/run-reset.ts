import 'dotenv/config';
import { RowDataPacket } from 'mysql2';

import { db } from '../lib/db';

async function reset(): Promise<void> {
  const [tables] = await db.query<(RowDataPacket & { TABLE_NAME?: string; table_name?: string })[]>(
    `SELECT table_name
         FROM information_schema.tables
         WHERE table_schema = DATABASE()
           AND table_type = 'BASE TABLE'`,
  );

  await db.query('SET FOREIGN_KEY_CHECKS = 0');

  for (const row of tables) {
    const name = row.TABLE_NAME ?? row.table_name;
    await db.query(`TRUNCATE TABLE \`${name}\``);
    console.log(`Truncated: ${name}`);
  }

  await db.query('SET FOREIGN_KEY_CHECKS = 1');

  console.log(`\nDone — ${tables.length} tables cleared. Run npm run seed:all to re-seed.`);
}

reset()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    db.end();
  });
