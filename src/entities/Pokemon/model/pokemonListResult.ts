import type { PokemonCard } from '../PokemonCard';

export type PokemonListResult = {
  data: PokemonCard[];
  total: number;
  page: number;
  totalPages: number;
};
