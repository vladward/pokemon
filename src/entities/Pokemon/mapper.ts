import { GENERATION_TO_REGION } from './config/regions';
import { TPokemonCard } from './TPokemonCard';
import type { TAbility, TBiology, TEvolutionNode, TEvolutionStep, TForm, TPokemonDetails } from './TPokemonDetails';

type RawSprite = { sprite_name: string | null; url: string | null };
type RawStat = { stat_name: string; base_stat: number };

function findSprite(sprites: RawSprite[], name: string): string | null {
  return sprites.find((s) => s.sprite_name === name)?.url ?? null;
}

function buildStatsMap(stats: RawStat[]): Record<string, number> {
  return Object.fromEntries(stats.map((s) => [s.stat_name, s.base_stat]));
}

function resolveName(
  form: { pokemon_form_name: { name: string }[] }[],
  species: { pokemon_species_name: { name: string }[] } | null,
  fallback: string,
): string {
  return form[0]?.pokemon_form_name[0]?.name ?? species?.pokemon_species_name[0]?.name ?? fallback;
}

type RawPokemon = {
  id: number;
  name: string;
  species_id: number | null;
  pokemon_sprite: RawSprite[];
  pokemon_stat: RawStat[];
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
  const statsMap = buildStatsMap(raw.pokemon_stat);
  const generationId: number | null = raw.species?.generation_id ?? null;

  return {
    id: raw.id,
    name: resolveName(raw.pokemon_form, raw.species, raw.name),
    types: raw.pokemon_type.map((t) => t.type.name),
    sprite: findSprite(raw.pokemon_sprite, 'front_default'),
    spriteArtwork: findSprite(raw.pokemon_sprite, 'other_official-artwork_front_default'),
    spriteDreamWorld: findSprite(raw.pokemon_sprite, 'other_dream_world_front_default'),
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

type RawAbility = {
  is_hidden: boolean | null;
  slot: number | null;
  ability: {
    id: number;
    ability_name: { name: string }[];
    ability_effect: { short_effect: string | null }[];
  };
};

type RawDetailsSpecies = {
  generation_id: number | null;
  is_mythical: boolean | null;
  is_legendary: boolean | null;
  capture_rate: number | null;
  base_happiness: number | null;
  hatch_counter: number | null;
  shape: string | null;
  color: string | null;
  habitat: string | null;
  pokemon_species_name: { name: string }[];
};

type RawPokemonDetails = {
  id: number;
  name: string;
  height: number | null;
  weight: number | null;
  species_id: number | null;
  pokemon_sprite: RawSprite[];
  pokemon_stat: RawStat[];
  pokemon_type: { type: { name: string; type_name: { name: string }[] } }[];
  pokemon_form: { pokemon_form_name: { name: string }[] }[];
  pokemon_ability: RawAbility[];
  species: RawDetailsSpecies | null;
};

type RawDetailsExtras = {
  genus: string | null;
  flavorText: string | null;
  eggGroups: string[];
  evolutionNodes: TEvolutionNode[];
  evolutionSteps: TEvolutionStep[];
  locations: string[];
  forms: TForm[];
  evolutionStage: 'base' | 'stage1' | 'stage2' | null;
};

export function mapPokemonDetails(raw: RawPokemonDetails, extras: RawDetailsExtras): TPokemonDetails {
  const statsMap = buildStatsMap(raw.pokemon_stat);
  const generationId = raw.species?.generation_id ?? null;

  const abilities: TAbility[] = raw.pokemon_ability.map((pa) => ({
    id: pa.ability.id,
    name: pa.ability.ability_name[0]?.name ?? String(pa.ability.id),
    isHidden: pa.is_hidden ?? false,
    shortEffect: pa.ability.ability_effect[0]?.short_effect ?? null,
  }));

  const biology: TBiology = {
    genus: extras.genus,
    height: raw.height ?? 0,
    weight: raw.weight ?? 0,
    eggGroups: extras.eggGroups,
    catchRate: raw.species?.capture_rate ?? null,
    baseHappiness: raw.species?.base_happiness ?? null,
    hatchCounter: raw.species?.hatch_counter ?? null,
    shape: raw.species?.shape ?? null,
    color: raw.species?.color ?? null,
    habitat: raw.species?.habitat ?? null,
  };

  return {
    id: raw.id,
    name: resolveName(raw.pokemon_form, raw.species, raw.name),
    types: raw.pokemon_type.map((t) => t.type.type_name[0]?.name ?? t.type.name),
    sprite: findSprite(raw.pokemon_sprite, 'front_default'),
    spriteArtwork: findSprite(raw.pokemon_sprite, 'other_official-artwork_front_default'),
    spriteDreamWorld: null,
    generation: generationId,
    region: generationId ? (GENERATION_TO_REGION[generationId] ?? 'Unknown') : 'Unknown',
    rarity: getRarity(raw.species),
    evolutionStage: extras.evolutionStage,
    stats: {
      hp: statsMap['hp'] ?? 0,
      attack: statsMap['attack'] ?? 0,
      defense: statsMap['defense'] ?? 0,
      specialAttack: statsMap['special-attack'] ?? 0,
      specialDefense: statsMap['special-defense'] ?? 0,
      speed: statsMap['speed'] ?? 0,
    },
    flavorText: extras.flavorText,
    abilities,
    biology,
    evolutions: extras.evolutionNodes,
    evolutionSteps: extras.evolutionSteps,
    locations: extras.locations,
    forms: extras.forms,
  };
}
