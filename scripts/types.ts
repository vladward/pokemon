export interface NamedResource {
  name: string;
  url: string;
}

export interface APIList {
  count: number;
  results: NamedResource[];
}

export interface PokemonRow {
  id: number;
  name: string;
  base_experience: number | null;
  height: number | null;
  weight: number | null;
  is_default: boolean;
  order_index: number | null;
  cry_latest_url: string | null;
  cry_legacy_url: string | null;
  species_id: number | null;
}

export interface TypeSlot {
  id: number;
  name: string;
  slot: number;
}

export interface AbilitySlot {
  id: number;
  name: string;
  is_hidden: boolean;
  slot: number;
}

export interface StatEntry {
  stat_name: string;
  base_stat: number;
  effort: number;
}

export interface SpriteEntry {
  sprite_name: string;
  url: string;
}

export interface MoveEntry {
  move_id: number;
  move_name: string;
  version_group_id: number;
  version_group_name: string;
  learn_method: string;
  level_learned_at: number;
}

export interface HeldItemEntry {
  item_id: number;
  item_name: string;
  version_id: number;
  version_name: string;
  rarity: number;
}

export interface GameIndexEntry {
  game_index: number;
  version_id: number;
  version_name: string;
}

export interface FormEntry {
  id: number;
  name: string;
}

export interface PastTypeEntry {
  generation_id: number;
  slot: number;
  type_id: number;
  type_name: string;
}

export interface PastAbilityEntry {
  generation_id: number;
  slot: number;
  ability_id: number;
  ability_name: string;
  is_hidden: boolean;
}

export interface TransformedPokemon {
  pokemon: PokemonRow;
  species_url: string | null;
  types: TypeSlot[];
  abilities: AbilitySlot[];
  stats: StatEntry[];
  sprites: SpriteEntry[];
  moves: MoveEntry[];
  held_items: HeldItemEntry[];
  game_indices: GameIndexEntry[];
  forms: FormEntry[];
  past_types: PastTypeEntry[];
  past_abilities: PastAbilityEntry[];
}

export interface SpeciesData {
  id: number;
  name: string;
  gender_rate: number | null;
  capture_rate: number | null;
  base_happiness: number | null;
  is_baby: boolean;
  hatch_counter: number | null;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  order_index: number | null;
  generation_id: number;
  generation_name: string;
  color: string | null;
  shape: string | null;
  habitat: string | null;
  growth_rate: string | null;
  evolution_chain_id: number | null;
}

export interface LocalizedName {
  language: string;
  name: string;
}

export interface LocalizedGenus {
  language: string;
  genus: string;
}

export interface FlavorTextEntry {
  language: string;
  game_version: string;
  flavor_text: string;
}

export interface PokedexNumberEntry {
  pokedex_name: string;
  entry_number: number;
}

export interface TransformedSpecies {
  species: SpeciesData;
  egg_groups: Array<{ id: number; name: string }>;
  names: LocalizedName[];
  genera: LocalizedGenus[];
  flavor_texts: FlavorTextEntry[];
  pokedex_numbers: PokedexNumberEntry[];
  evolution_chain_url: string | null;
}

export interface EvolutionDetail {
  chain_id: number;
  from_species_id: number;
  to_species_id: number;
  trigger: string | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  relative_physical_stats: number | null;
  time_of_day: string | null;
  turn_upside_down: boolean;
  gender: number | null;
  item_id: number | null;
  held_item_id: number | null;
  known_move_id: number | null;
  known_move_type_id: number | null;
  location_id: number | null;
  party_species_id: number | null;
  party_type_id: number | null;
  trade_species_id: number | null;
}

export interface TransformedEvolutionChain {
  chain: { id: number; baby_trigger_item_id: number | null };
  evolutions: EvolutionDetail[];
}

export interface SeedStateRow {
  id: string;
  value: number;
}
