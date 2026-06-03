import type { findLocations } from './api/locationRepository';
import { Location } from './model/location';

type RawLocation = Awaited<ReturnType<typeof findLocations>>[number];

export function mapLocation(raw: RawLocation): Location {
  return {
    id: raw.id,
    name: raw.location_name[0]?.name ?? raw.name,
    regionId: raw.region_id,
    regionName: raw.region?.region_name[0]?.name ?? raw.region?.name ?? null,
  };
}
