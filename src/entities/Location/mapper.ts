import { Prisma } from '@prisma/client';

import { Location } from './model/location';

type RawLocation = Prisma.locationGetPayload<{
  include: {
    location_name: true;
    region: { include: { region_name: true } };
  };
}>;

export function mapLocation(raw: RawLocation): Location {
  return {
    id: raw.id,
    name: raw.location_name[0]?.name ?? raw.name,
    regionId: raw.region_id,
    regionName: raw.region?.region_name[0]?.name ?? raw.region?.name ?? null,
  };
}
