import { findGenerations } from './generationRepository';

export async function getGenerationList() {
  const generations = await findGenerations();
  return generations.map((g) => ({
    id: g.id,
    name: g.generation_name[0]?.name ?? `Generation ${g.id}`,
  }));
}
