import { POKEMON_PAGE_SIZE, PokemonSearchQuery } from '@/entities/Pokemon';

import { mapPokemon } from '../mapper';

import { findPokemon } from './pokemonRepository';

export async function getPokemonList(query: PokemonSearchQuery) {
  const { items, total, page } = await findPokemon(query);

  return {
    data: items.map(mapPokemon),
    total,
    page,
    totalPages: Math.ceil(total / POKEMON_PAGE_SIZE),
  };
}
