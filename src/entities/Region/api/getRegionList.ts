import { mapRegion } from '../mapper';

import { findRegions } from './regionRepository';

export async function getRegionList(lang?: string) {
  const regions = await findRegions(lang);
  return regions.map(mapRegion);
}
