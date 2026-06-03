import type { PokemonSearchQuery } from '@/entities/Pokemon';

export type PokemonSearchFilters = Omit<PokemonSearchQuery, 'page' | 'sortBy' | 'sortOrder'>;
