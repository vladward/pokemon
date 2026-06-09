import { unstable_cache } from 'next/cache';

import { findAvailableRarities } from './rarityRepository';

export const getRarityList = unstable_cache(async () => findAvailableRarities(), ['rarity-list'], {
  revalidate: 3600,
});
