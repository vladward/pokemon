import { findGenerations } from './generationRepository';

function formatGenerationName(slug: string): string {
  const roman = slug.replace('generation-', '').toUpperCase();
  return `Generation ${roman}`;
}

export async function getGenerationList() {
  const generations = await findGenerations();
  return generations.map((g) => ({
    id: g.id,
    name: formatGenerationName(g.name),
    slug: g.name,
  }));
}
