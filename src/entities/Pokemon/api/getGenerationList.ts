import { unstable_cache } from 'next/cache';

import { findGenerations } from './generationRepository';

function formatGenerationName(slug: string): string {
  const roman = slug.replace('generation-', '').toUpperCase();
  return `Generation ${roman}`;
}

export const getGenerationList = unstable_cache(
  async () => {
    const generations = await findGenerations();
    return generations.map((g) => ({
      id: g.id,
      name: formatGenerationName(g.name),
      slug: g.name,
    }));
  },
  ['generation-list'],
  { revalidate: 3600 },
);
