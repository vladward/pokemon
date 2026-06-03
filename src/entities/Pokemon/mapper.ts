import { Prisma } from '@prisma/client';

import { GENERATION_TO_REGION } from './config/regions';
import { PokemonCard } from './PokemonCard';

type RawPokemon = Prisma.pokemonGetPayload<{
  include: {
    species: true;
    pokemon_type: { include: { type: true } };
    pokemon_stat: true;
    pokemon_sprite: true;
  };
}>;

export function mapPokemon(raw: RawPokemon): PokemonCard {
  const sprite = raw.pokemon_sprite.find((s) => s.sprite_name === 'front_default')?.url ?? null;

  const statsMap: Record<string, number> = Object.fromEntries(
    raw.pokemon_stat.map((s) => [s.stat_name, s.base_stat]),
  );

  const generationId: number | null = raw.species?.generation_id ?? null;

  return {
    id: raw.id,
    name: raw.name,
    types: raw.pokemon_type.map((t) => t.type.name),
    sprite,
    generation: generationId,
    region: generationId ? (GENERATION_TO_REGION[generationId] ?? 'Unknown') : 'Unknown',
    rarity: getRarity(raw.species),
    stats: {
      hp: statsMap['hp'] ?? 0,
      attack: statsMap['attack'] ?? 0,
      defense: statsMap['defense'] ?? 0,
      speed: statsMap['speed'] ?? 0,
    },
  };
}

type RawSpecies = RawPokemon['species'];

function getRarity(species: RawSpecies): PokemonCard['rarity'] {
  if (!species) return 'common';
  if (species.is_mythical) return 'mythical';
  if (species.is_legendary) return 'legendary';
  if (species.capture_rate !== null && species.capture_rate <= 45) return 'rare';
  return 'common';
}
