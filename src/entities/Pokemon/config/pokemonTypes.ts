export const POKEMON_TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
  'fairy',
  'dark',
  'normal',
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];
