import type { findRegions } from './api/regionRepository';
import { Region } from './model/region';

type RawRegion = Awaited<ReturnType<typeof findRegions>>[number];

export function mapRegion(raw: RawRegion): Region {
  return {
    id: raw.id,
    name: raw.region_name[0]?.name ?? raw.name,
    generationId: raw.main_generation_id ?? null,
    localizedName: raw.region_name[0]?.name ?? raw.name,
  };
}
