import { db } from '@/shared/db/db';

export async function findLocations(lang = 'en') {
  return db.location.findMany({
    include: {
      location_name: {
        where: { language: lang },
        take: 1,
      },
      region: {
        include: {
          region_name: {
            where: { language: lang },
            take: 1,
          },
        },
      },
    },
    orderBy: { id: 'asc' },
  });
}
