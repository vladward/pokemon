import { notFound } from 'next/navigation';

import { getPokemonById } from '@/entities/Pokemon';
import { PokemonDetailsPage } from '@/views/PokemonDetails';

interface Params {
  params: Promise<{ id: string; locale: string }>;
}

export default async function Page({ params }: Params) {
  const { id, locale } = await params;
  const pokemon = await getPokemonById(Number(id), locale);

  if (!pokemon) notFound();

  return <PokemonDetailsPage pokemon={pokemon} />;
}
