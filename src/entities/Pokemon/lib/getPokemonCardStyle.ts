import type { CSSProperties } from 'react';

import { RARITY_OVERLAYS } from '../config/rarityOverlays';
import type { PokemonCard } from '../PokemonCard';

export function getPokemonCardStyle(pokemon: Pick<PokemonCard, 'types' | 'rarity'>): CSSProperties {
  const [primary, secondary] = pokemon.types;

  return {
    '--type-color-primary': `var(--type-${primary})`,
    '--type-color-secondary': `var(--type-${secondary ?? primary})`,
    '--rarity-overlay': RARITY_OVERLAYS[pokemon.rarity],
  } as CSSProperties;
}
