import { notFound } from 'next/navigation';

import { getPokemonById, getPokemonNeighbors } from '@/entities/Pokemon';
import { PokemonNavigation } from '@/features/PokemonNavigation';
import { PokemonDetailsPage } from '@/views/PokemonDetails';

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

  return (
    <PokemonDetailsPage
      pokemon={pokemon}
      nav={
        <PokemonNavigation
          prevId={neighbors.prevId}
          nextId={neighbors.nextId}
          locale={locale}
        />
      }
    />
  );
}
