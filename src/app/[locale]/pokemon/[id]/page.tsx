import { notFound } from 'next/navigation';

import { PokemonDetailsPage } from '@/views/PokemonDetails';

import { PokemonNavigation } from '@/features/PokemonNavigation';

import { getPokemonById, getPokemonNeighbors } from '@/entities/Pokemon';

// import { locales } from '@/shared/config/i18n';
// import { db } from '@/shared/db/db';

export const dynamicParams = true;

// export async function generateStaticParams() {
//   const pokemon = await db.pokemon.findMany({ select: { id: true } });
//   return locales.flatMap((locale) => pokemon.map((p) => ({ locale, id: String(p.id) })));
// }

interface Params {
  params: Promise<{ id: string; locale: string }>;
}

export default async function Page({ params }: Params) {
  const { id, locale } = await params;
  const numericId = Number(id);

  const [pokemon, neighbors] = await Promise.all([
    getPokemonById(numericId, locale),
    getPokemonNeighbors(numericId),
  ]);

  if (!pokemon) notFound();

  // Warm the cache for adjacent pokemon so the next navigation hit is instant
  if (neighbors.prevId) getPokemonById(neighbors.prevId, locale);
  if (neighbors.nextId) getPokemonById(neighbors.nextId, locale);

  return (
    <PokemonDetailsPage
      pokemon={pokemon}
      nav={
        <PokemonNavigation
          prevId={neighbors.prevId}
          nextId={neighbors.nextId}
        />
      }
    />
  );
}
