import { unstable_cache } from 'next/cache';

import { mapRegion } from '../mapper';
import { findRegions } from './regionRepository';

export const getRegionList = (lang?: string) =>
  unstable_cache(
    async () => {
      const regions = await findRegions(lang);
      return regions.map(mapRegion);
    },
    ['region-list', lang ?? 'default'],
    { revalidate: 3600 },
  )();
