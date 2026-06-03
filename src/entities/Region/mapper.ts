import { Prisma } from '@prisma/client';

import { Region } from './model/region';

type RawRegion = Prisma.regionGetPayload<{
  include: { region_name: true };
}>;

export function mapRegion(raw: RawRegion): Region {
  return {
    id: raw.id,
    name: raw.region_name[0]?.name ?? raw.name,
    generationId: raw.main_generation_id ?? null,
    localizedName: raw.region_name[0]?.name ?? raw.name,
  };
}
