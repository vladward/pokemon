import type { TPokemonCard } from '../TPokemonCard';

export type PokemonListResult = {
  data: TPokemonCard[];
  total: number;
  page: number;
  totalPages: number;
};
