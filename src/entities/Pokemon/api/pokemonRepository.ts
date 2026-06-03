import { POKEMON_PAGE_SIZE, PokemonSearchQuery } from '@/entities/Pokemon';

import { db } from '@/shared/db/db';

import { buildPokemonWhere } from './pokemonQueryBuilder';

export async function findPokemon(query: PokemonSearchQuery) {
  const page = query.page ?? 1;
  const where = buildPokemonWhere(query);

  const [items, total] = await Promise.all([
    db.pokemon.findMany({
      where,
      include: {
        species: true,
        pokemon_type: { include: { type: true } },
        pokemon_stat: true,
        pokemon_sprite: true,
      },
      orderBy: { [query.sortBy ?? 'id']: query.sortOrder ?? 'asc' },
      take: POKEMON_PAGE_SIZE,
      skip: (page - 1) * POKEMON_PAGE_SIZE,
    }),
    db.pokemon.count({ where }),
  ]);

  return { items, total, page };
}
