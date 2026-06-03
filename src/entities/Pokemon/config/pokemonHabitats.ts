export const POKEMON_HABITATS = [
  'cave',
  'forest',
  'grassland',
  'mountain',
  'rare',
  'rough-terrain',
  'sea',
  'urban',
  'waters-edge',
] as const;

export type PokemonHabitat = (typeof POKEMON_HABITATS)[number];
