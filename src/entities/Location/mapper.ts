import { Location } from './model/location';

type RawLocation = {
  id: number;
  name: string;
  region_id: number | null;
  location_name: { name: string }[];
  region: { name: string; region_name: { name: string }[] } | null;
};

export function mapLocation(raw: RawLocation): Location {
  return {
    id: raw.id,
    name: raw.location_name[0]?.name ?? raw.name,
    regionId: raw.region_id,
    regionName: raw.region?.region_name[0]?.name ?? raw.region?.name ?? null,
  };
}
