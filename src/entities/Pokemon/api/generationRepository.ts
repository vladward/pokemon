import { db } from '@/shared/db/db';

export async function findGenerations() {
  return db.generation.findMany({
    select: {
      id: true,
      generation_name: {
        where: { language: 'en' },
        select: { name: true },
      },
    },
    orderBy: { id: 'asc' },
  });
}
