import { db } from '@/shared/db/db';

import type { TForm } from '../TPokemonDetails';

const FORM_SPRITES = ['front_default', 'other_official-artwork_front_default'] as const;

function pickSprite(sprites: { sprite_name: string | null; url: string | null }[]): string | null {
  for (const name of FORM_SPRITES) {
    const url = sprites.find((s) => s.sprite_name === name)?.url;
    if (url) return url;
  }
  return null;
}

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
      pokemon_sprite: { where: { sprite_name: { in: [...FORM_SPRITES] } } },
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
      sprite: pickSprite(p.pokemon_sprite),
      isCurrent: p.id === currentPokemonId,
    };
  });
}
