import { db } from '@/shared/db/db';

export async function findTypes() {
  return db.type.findMany({
    select: { name: true },
    orderBy: { name: 'asc' },
  });
}
