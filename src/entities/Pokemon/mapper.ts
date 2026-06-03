import { GENERATION_TO_REGION } from './config/regions';
import { PokemonCard } from './PokemonCard';

type RawPokemon = {
  id: number;
  name: string;
  pokemon_sprite: { sprite_name: string | null; url: string | null }[];
  pokemon_stat: { stat_name: string; base_stat: number }[];
  pokemon_type: { type: { name: string } }[];
  species: {
    generation_id: number | null;
    is_mythical: boolean | null;
    is_legendary: boolean | null;
    capture_rate: number | null;
  } | null;
};

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

function getRarity(species: RawPokemon['species']): PokemonCard['rarity'] {
  if (!species) return 'common';
  if (species.is_mythical) return 'mythical';
  if (species.is_legendary) return 'legendary';
  if (species.capture_rate !== null && species.capture_rate <= 45) return 'rare';
  if (species.capture_rate !== null && species.capture_rate <= 100) return 'uncommon';
  return 'common';
}
