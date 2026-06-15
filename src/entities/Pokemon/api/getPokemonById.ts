import { unstable_cache } from 'next/cache';

import { db } from '@/shared/db/db';

import { mapPokemonDetails } from '../mapper';
import type { TEvolutionStep, TPokemonDetails } from '../TPokemonDetails';

import { getPokemonEvolutionChain } from './getPokemonEvolutionChain';
import { getPokemonForms } from './getPokemonForms';
import { getPokemonLocations } from './getPokemonLocations';

// dream_world sprite is only used on list cards, not on the detail page
const USED_SPRITES = ['front_default', 'other_official-artwork_front_default'] as const;

function deriveEvolutionStage(
  speciesId: number,
  steps: TEvolutionStep[],
): 'base' | 'stage1' | 'stage2' | null {
  const toIds = new Set(steps.map((s) => s.toSpeciesId));
  if (!toIds.has(speciesId)) return 'base';
  const parentId = steps.find((s) => s.toSpeciesId === speciesId)?.fromSpeciesId;
  return parentId !== undefined && toIds.has(parentId) ? 'stage2' : 'stage1';
}

type SpeciesMetaRow = {
  genus: string | null;
  flavor_text: string | null;
  egg_groups: string | null;
};

async function resolveSpeciesMeta(
  speciesId: number,
  locale: string,
): Promise<{ genus: string | null; flavorText: string | null; eggGroups: string[] }> {
  const [row] = await db.$queryRaw<SpeciesMetaRow[]>`
        SELECT (SELECT genus
                FROM pokemon_species_genus
                WHERE species_id = ${speciesId} AND language = ${locale} LIMIT 1) AS genus, (
        SELECT flavor_text
        FROM pokemon_species_flavor_text
        WHERE species_id = ${speciesId}
          AND language = ${locale}
        ORDER BY id DESC LIMIT 1) AS flavor_text,
            (
        SELECT GROUP_CONCAT(COALESCE (egn.name, eg.name) ORDER BY eg.id SEPARATOR '|||')
        FROM pokemon_species_egg_group pseg
            JOIN egg_group eg
        ON pseg.egg_group_id = eg.id
            LEFT JOIN egg_group_name egn ON eg.id = egn.egg_group_id AND egn.language = ${locale}
        WHERE pseg.species_id = ${speciesId}) AS egg_groups
    `;
  return {
    genus: row?.genus ?? null,
    flavorText: row?.flavor_text ?? null,
    eggGroups: row?.egg_groups ? row.egg_groups.split('|||') : [],
  };
}

async function fetchPokemonById(id: number, locale: string): Promise<TPokemonDetails | null> {
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
      pokemon_type: {
        include: {
          type: {
            include: {
              type_name: { where: { language: locale }, take: 1 },
            },
          },
        },
        orderBy: { slot: 'asc' },
      },
      pokemon_stat: true,
      // Fetch only the three sprites actually used instead of all 25+
      pokemon_sprite: {
        where: { sprite_name: { in: [...USED_SPRITES] } },
      },
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
  // evolution_chain_id is a scalar on pokemon_species — already fetched by the main query
  const chainId = raw.species?.evolution_chain_id ?? null;

  const [speciesMeta, evolution, locations, forms] = await Promise.all([
    speciesId
      ? resolveSpeciesMeta(speciesId, locale)
      : { genus: null, flavorText: null, eggGroups: [] as string[] },
    speciesId ? getPokemonEvolutionChain(chainId, speciesId, locale) : { nodes: [], steps: [] },
    getPokemonLocations(id, locale),
    getPokemonForms(speciesId, id, locale),
  ]);

  const evolutionStage = speciesId ? deriveEvolutionStage(speciesId, evolution.steps) : null;

  return mapPokemonDetails(raw, {
    genus: speciesMeta.genus,
    flavorText: speciesMeta.flavorText,
    eggGroups: speciesMeta.eggGroups,
    evolutionNodes: evolution.nodes,
    evolutionSteps: evolution.steps,
    locations,
    forms,
    evolutionStage,
  });
}

export const getPokemonById = unstable_cache(fetchPokemonById, ['pokemon-by-id'], {
  revalidate: false,
});
