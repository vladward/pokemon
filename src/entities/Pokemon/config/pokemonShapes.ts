export const POKEMON_SHAPES = [
  'ball',
  'squiggle',
  'fish',
  'arms',
  'blob',
  'upright',
  'legs',
  'quadruped',
  'wings',
  'tentacles',
  'heads',
  'humanoid',
  'bug-wings',
  'armor',
] as const;

export type PokemonShape = (typeof POKEMON_SHAPES)[number];
