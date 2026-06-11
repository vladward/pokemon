import { unstable_cache } from 'next/cache';

import { db } from '@/shared/db/db';

import type { TEvolutionNode, TEvolutionStep } from '../TPokemonDetails';

const EVOLUTION_SPRITES = ['front_default', 'other_official-artwork_front_default'] as const;

function pickSprite(sprites: { sprite_name: string | null; url: string | null }[]): string | null {
  for (const name of EVOLUTION_SPRITES) {
    const url = sprites.find((s) => s.sprite_name === name)?.url;
    if (url) return url;
  }
  return null;
}

type RawNode = Omit<TEvolutionNode, 'isCurrent'>;

async function fetchChainData(
  chainId: number,
  locale: string,
): Promise<{ nodes: RawNode[]; steps: TEvolutionStep[] }> {
  const [rawSteps, speciesRows] = await Promise.all([
    db.pokemon_evolution.findMany({ where: { chain_id: chainId } }),
    db.pokemon_species.findMany({
      where: { evolution_chain_id: chainId },
      include: {
        pokemon_species_name: { where: { language: locale }, take: 1 },
        pokemon: {
          where: { is_default: true },
          take: 1,
          include: {
            pokemon_sprite: { where: { sprite_name: { in: [...EVOLUTION_SPRITES] } } },
          },
        },
      },
    }),
  ]);

  const steps: TEvolutionStep[] = rawSteps
    .filter((s) => s.from_species_id !== null && s.to_species_id !== null)
    .map((s) => ({
      fromSpeciesId: s.from_species_id!,
      toSpeciesId: s.to_species_id!,
      trigger: s.trigger,
      minLevel: s.min_level,
    }));

  const nodes: RawNode[] = speciesRows.map((s) => {
    const defaultPokemon = s.pokemon[0];
    return {
      speciesId: s.id,
      pokemonId: defaultPokemon?.id ?? 0,
      name: s.pokemon_species_name[0]?.name ?? s.name,
      sprite: defaultPokemon ? pickSprite(defaultPokemon.pokemon_sprite) : null,
    };
  });

  return { nodes, steps };
}

// Keyed by (chainId, locale) — shared across all pokemon in the same family
const getCachedChainData = unstable_cache(
  fetchChainData,
  ['evolution-chain'],
  { revalidate: false },
);

async function fetchSingleSpeciesNode(speciesId: number, locale: string): Promise<RawNode | null> {
  const species = await db.pokemon_species.findUnique({
    where: { id: speciesId },
    include: {
      pokemon_species_name: { where: { language: locale }, take: 1 },
      pokemon: {
        where: { is_default: true },
        take: 1,
        include: {
          pokemon_sprite: { where: { sprite_name: { in: [...EVOLUTION_SPRITES] } } },
        },
      },
    },
  });

  if (!species) return null;

  const defaultPokemon = species.pokemon[0];
  return {
    speciesId: species.id,
    pokemonId: defaultPokemon?.id ?? 0,
    name: species.pokemon_species_name[0]?.name ?? species.name,
    sprite: defaultPokemon ? pickSprite(defaultPokemon.pokemon_sprite) : null,
  };
}

const getCachedSingleNode = unstable_cache(
  fetchSingleSpeciesNode,
  ['evolution-species-node'],
  { revalidate: false },
);

export async function getPokemonEvolutionChain(
  chainId: number | null,
  currentSpeciesId: number,
  locale: string,
): Promise<{ nodes: TEvolutionNode[]; steps: TEvolutionStep[] }> {
  if (chainId === null) {
    const node = await getCachedSingleNode(currentSpeciesId, locale);
    if (!node) return { nodes: [], steps: [] };
    return { nodes: [{ ...node, isCurrent: true }], steps: [] };
  }

  const { nodes: rawNodes, steps } = await getCachedChainData(chainId, locale);
  const nodes: TEvolutionNode[] = rawNodes.map((n) => ({
    ...n,
    isCurrent: n.speciesId === currentSpeciesId,
  }));
  return { nodes, steps };
}
