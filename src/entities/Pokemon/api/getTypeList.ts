import { unstable_cache } from 'next/cache';

import { findTypes } from './typeRepository';

export const getTypeList = unstable_cache(
  async () => {
    const types = await findTypes();
    return types.map((t) => t.name);
  },
  ['type-list'],
  { revalidate: 3600 },
);
