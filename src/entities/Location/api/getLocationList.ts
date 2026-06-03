import { mapLocation } from '../mapper';

import { findLocations } from './locationRepository';

export async function getLocationList(lang?: string) {
  const raw = await findLocations(lang);
  return raw.map(mapLocation);
}
