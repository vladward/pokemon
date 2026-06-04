import type { PokemonRarity } from './pokemonRarities';

export const RARITY_OVERLAYS: Record<PokemonRarity, string> = {
  common: 'linear-gradient(transparent, transparent)',
  uncommon: 'linear-gradient(135deg, rgba(200, 220, 255, 0.12) 0%, transparent 60%)',
  rare: 'linear-gradient(135deg, rgba(80, 130, 255, 0.28) 0%, transparent 60%)',
  legendary: 'linear-gradient(135deg, rgba(255, 215, 0, 0.4) 0%, rgba(255, 165, 0, 0.12) 100%)',
  mythical: 'linear-gradient(135deg, rgba(255, 80, 255, 0.32) 0%, rgba(80, 200, 255, 0.32) 100%)',
};
