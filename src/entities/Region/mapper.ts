import { Region } from './model/region';

type RawRegion = {
  id: number;
  name: string;
  main_generation_id: number | null;
  region_name: { name: string }[];
};

export function mapRegion(raw: RawRegion): Region {
  return {
    id: raw.id,
    name: raw.region_name[0]?.name ?? raw.name,
    generationId: raw.main_generation_id ?? null,
    localizedName: raw.region_name[0]?.name ?? raw.name,
  };
}
