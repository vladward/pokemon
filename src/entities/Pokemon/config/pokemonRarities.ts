export const POKEMON_RARITIES = ['common', 'uncommon', 'rare', 'legendary', 'mythical'] as const;

export type PokemonRarity = (typeof POKEMON_RARITIES)[number];
