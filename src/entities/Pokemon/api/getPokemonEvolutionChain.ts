import { db } from '@/shared/db/db';

import type { TEvolutionNode, TEvolutionStep } from '../TPokemonDetails';

export async function getPokemonEvolutionChain(
  speciesId: number | null,
  locale: string,
): Promise<{ nodes: TEvolutionNode[]; steps: TEvolutionStep[] }> {
  if (speciesId === null) return { nodes: [], steps: [] };

  const species = await db.pokemon_species.findUnique({
    where: { id: speciesId },
    select: { evolution_chain_id: true },
  });

  const chainId = species?.evolution_chain_id ?? null;

  const rawSteps = chainId
    ? await db.pokemon_evolution.findMany({ where: { chain_id: chainId } })
    : [];

  const steps: TEvolutionStep[] = rawSteps
    .filter((s) => s.from_species_id !== null && s.to_species_id !== null)
    .map((s) => ({
      fromSpeciesId: s.from_species_id!,
      toSpeciesId: s.to_species_id!,
      trigger: s.trigger,
      minLevel: s.min_level,
    }));

  const chainSpeciesIds = new Set<number>([speciesId]);
  for (const step of rawSteps) {
    if (step.from_species_id) chainSpeciesIds.add(step.from_species_id);
    if (step.to_species_id) chainSpeciesIds.add(step.to_species_id);
  }

  const speciesRows = await db.pokemon_species.findMany({
    where: { id: { in: [...chainSpeciesIds] } },
    include: {
      pokemon_species_name: { where: { language: locale }, take: 1 },
      pokemon: {
        where: { is_default: true },
        take: 1,
        include: {
          pokemon_sprite: { where: { sprite_name: 'front_default' }, take: 1 },
        },
      },
    },
  });

  const nodes: TEvolutionNode[] = speciesRows.map((s) => {
    const defaultPokemon = s.pokemon[0];
    return {
      speciesId: s.id,
      pokemonId: defaultPokemon?.id ?? 0,
      name: s.pokemon_species_name[0]?.name ?? s.name,
      sprite: defaultPokemon?.pokemon_sprite[0]?.url ?? null,
      isCurrent: s.id === speciesId,
    };
  });

  return { nodes, steps };
}
