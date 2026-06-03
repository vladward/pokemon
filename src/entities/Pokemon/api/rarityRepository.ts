import { db } from '@/shared/db/db';

import { type PokemonRarity } from '../config/pokemonRarities';

const RARITY_CONDITIONS: { rarity: PokemonRarity; where: object }[] = [
  { rarity: 'mythical', where: { is_mythical: true } },
  { rarity: 'legendary', where: { is_legendary: true } },
  { rarity: 'rare', where: { is_legendary: false, is_mythical: false, capture_rate: { lte: 45 } } },
  {
    rarity: 'uncommon',
    where: { is_legendary: false, is_mythical: false, capture_rate: { gt: 45, lte: 100 } },
  },
  {
    rarity: 'common',
    where: {
      is_legendary: false,
      is_mythical: false,
      OR: [{ capture_rate: { gt: 100 } }, { capture_rate: null }],
    },
  },
];

export async function findAvailableRarities(): Promise<PokemonRarity[]> {
  const counts = await Promise.all(
    RARITY_CONDITIONS.map(({ where }) => db.pokemon_species.count({ where })),
  );

  return RARITY_CONDITIONS.filter((_, i) => counts[i] > 0).map((r) => r.rarity);
}
