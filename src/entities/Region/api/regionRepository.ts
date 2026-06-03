import { db } from '@/shared/db/db';

export async function findRegions(lang = 'en') {
  return db.region.findMany({
    include: {
      region_name: {
        where: { language: lang },
        take: 1,
      },
    },
    orderBy: { id: 'asc' },
  });
}
