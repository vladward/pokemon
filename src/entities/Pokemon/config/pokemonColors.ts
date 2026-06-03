export const POKEMON_COLORS = [
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
] as const;

export type PokemonColor = (typeof POKEMON_COLORS)[number];
