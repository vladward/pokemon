import { db } from '@/shared/db/db';

export async function findGenerations() {
  return db.generation.findMany({
    select: { id: true, name: true },
    orderBy: { id: 'asc' },
  });
}
