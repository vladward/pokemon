import { db } from '@/shared/db/db';

import { mapPokemonDetails } from '../mapper';
import type { TPokemonDetails } from '../TPokemonDetails';

import { getPokemonEvolutionChain } from './getPokemonEvolutionChain';
import { getPokemonForms } from './getPokemonForms';
import { getPokemonLocations } from './getPokemonLocations';

async function resolveEvolutionStage(
  speciesId: number,
): Promise<'base' | 'stage1' | 'stage2' | null> {
  const rows = await db.$queryRaw<{ evolution_stage: string }[]>`
    SELECT
      CASE
        WHEN ${speciesId} NOT IN (
          SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL
        ) THEN 'base'
        WHEN (
          SELECT from_species_id FROM pokemon_evolution
          WHERE to_species_id = ${speciesId} LIMIT 1
        ) IN (
          SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL
        ) THEN 'stage2'
        ELSE 'stage1'
      END AS evolution_stage
  `;
  return (rows[0]?.evolution_stage as 'base' | 'stage1' | 'stage2') ?? null;
}

async function resolveEggGroups(speciesId: number, locale: string): Promise<string[]> {
  const rows = await db.pokemon_species_egg_group.findMany({ where: { species_id: speciesId } });
  if (rows.length === 0) return [];

  const groups = await db.egg_group.findMany({
    where: { id: { in: rows.map((r) => r.egg_group_id) } },
    include: { egg_group_name: { where: { language: locale }, take: 1 } },
  });

  return groups.map((g) => g.egg_group_name[0]?.name ?? g.name);
}

export async function getPokemonById(
  id: number,
  locale: string = 'en',
): Promise<TPokemonDetails | null> {
  const raw = await db.pokemon.findUnique({
    where: { id },
    include: {
      pokemon_form: {
        take: 1,
        include: {
          pokemon_form_name: { where: { language: locale }, take: 1 },
        },
      },
      species: {
        include: {
          pokemon_species_name: { where: { language: locale }, take: 1 },
        },
      },
      pokemon_type: { include: { type: true }, orderBy: { slot: 'asc' } },
      pokemon_stat: true,
      pokemon_sprite: true,
      pokemon_ability: {
        include: {
          ability: {
            include: {
              ability_name: { where: { language: locale }, take: 1 },
              ability_effect: { where: { language: locale }, take: 1 },
            },
          },
        },
        orderBy: { slot: 'asc' },
      },
    },
  });

  if (!raw) return null;

  const speciesId = raw.species_id;

  const [genus, flavorText, eggGroups, evolution, locations, forms, evolutionStage] =
    await Promise.all([
      speciesId
        ? db.pokemon_species_genus
            .findFirst({ where: { species_id: speciesId, language: locale } })
            .then((r) => r?.genus ?? null)
        : null,
      speciesId
        ? db.pokemon_species_flavor_text
            .findFirst({
              where: { species_id: speciesId, language: locale },
              orderBy: { id: 'desc' },
            })
            .then((r) => r?.flavor_text ?? null)
        : null,
      speciesId ? resolveEggGroups(speciesId, locale) : ([] as string[]),
      getPokemonEvolutionChain(speciesId, locale),
      getPokemonLocations(id, locale),
      getPokemonForms(speciesId, id, locale),
      speciesId ? resolveEvolutionStage(speciesId) : null,
    ]);

  return mapPokemonDetails(raw, {
    genus,
    flavorText,
    eggGroups,
    evolutionNodes: evolution.nodes,
    evolutionSteps: evolution.steps,
    locations,
    forms,
    evolutionStage,
  });
}
