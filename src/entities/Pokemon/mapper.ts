import { GENERATION_TO_REGION } from './config/regions';
import { TPokemonCard } from './TPokemonCard';

type RawPokemon = {
  id: number;
  name: string;
  species_id: number | null;
  pokemon_sprite: { sprite_name: string | null; url: string | null }[];
  pokemon_stat: { stat_name: string; base_stat: number }[];
  pokemon_type: { type: { name: string } }[];
  pokemon_form: { pokemon_form_name: { name: string }[] }[];
  species: {
    generation_id: number | null;
    is_mythical: boolean | null;
    is_legendary: boolean | null;
    capture_rate: number | null;
    pokemon_species_name: { name: string }[];
  } | null;
};

export function mapPokemon(
  raw: RawPokemon,
  stageMap: Record<number, 'base' | 'stage1' | 'stage2'> = {},
): TPokemonCard {
  const sprite = raw.pokemon_sprite.find((s) => s.sprite_name === 'front_default')?.url ?? null;
  const spriteArtwork =
    raw.pokemon_sprite.find((s) => s.sprite_name === 'other_official-artwork_front_default')?.url ??
    null;
  const spriteDreamWorld =
    raw.pokemon_sprite.find((s) => s.sprite_name === 'other_dream_world_front_default')?.url ??
    null;

  const statsMap: Record<string, number> = Object.fromEntries(
    raw.pokemon_stat.map((s) => [s.stat_name, s.base_stat]),
  );

  const generationId: number | null = raw.species?.generation_id ?? null;

  return {
    id: raw.id,
    name:
      raw.pokemon_form[0]?.pokemon_form_name[0]?.name ??
      raw.species?.pokemon_species_name[0]?.name ??
      raw.name,
    types: raw.pokemon_type.map((t) => t.type.name),
    sprite,
    spriteArtwork,
    spriteDreamWorld,
    generation: generationId,
    region: generationId ? (GENERATION_TO_REGION[generationId] ?? 'Unknown') : 'Unknown',
    rarity: getRarity(raw.species),
    evolutionStage: raw.species_id != null ? (stageMap[raw.species_id] ?? null) : null,
    stats: {
      hp: statsMap['hp'] ?? 0,
      attack: statsMap['attack'] ?? 0,
      defense: statsMap['defense'] ?? 0,
      speed: statsMap['speed'] ?? 0,
    },
  };
}

function getRarity(species: RawPokemon['species']): TPokemonCard['rarity'] {
  if (!species) return 'common';
  if (species.is_mythical) return 'mythical';
  if (species.is_legendary) return 'legendary';
  if (species.capture_rate !== null && species.capture_rate <= 45) return 'rare';
  if (species.capture_rate !== null && species.capture_rate <= 100) return 'uncommon';
  return 'common';
}
