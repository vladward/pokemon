import { db } from '@/shared/db/db';

import type { TForm } from '../TPokemonDetails';

export async function getPokemonForms(
  speciesId: number | null,
  currentPokemonId: number,
  locale: string,
): Promise<TForm[]> {
  if (speciesId === null) return [];

  const pokemonRows = await db.pokemon.findMany({
    where: { species_id: speciesId },
    include: {
      pokemon_form: {
        take: 1,
        include: {
          pokemon_form_name: { where: { language: locale }, take: 1 },
        },
      },
      pokemon_sprite: { where: { sprite_name: 'front_default' }, take: 1 },
      species: {
        include: {
          pokemon_species_name: { where: { language: locale }, take: 1 },
        },
      },
    },
    orderBy: { order_index: 'asc' },
  });

  return pokemonRows.map((p) => {
    const formName = p.pokemon_form[0]?.pokemon_form_name[0]?.name;
    const speciesName = p.species?.pokemon_species_name[0]?.name;
    return {
      pokemonId: p.id,
      name: formName ?? speciesName ?? p.name,
      sprite: p.pokemon_sprite[0]?.url ?? null,
      isCurrent: p.id === currentPokemonId,
    };
  });
}
