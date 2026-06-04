'use client';

import { Suspense, useState } from 'react';

import type { Location } from '@/entities/Location';
import type { Generation, PokemonListResult, PokemonRarity } from '@/entities/Pokemon';
import { PokemonCard } from '@/entities/Pokemon/ui/PokemonCard.v10';
import type { Region } from '@/entities/Region';

import { cn } from '@/shared/lib/utils/cn';
import { Container, Pagination } from '@/shared/ui';

import { PokemonCardList } from './PokemonCardList';
import { PokemonFilters } from './PokemonFilters';

interface Props {
  pokemonList: PokemonListResult;
  locations: Location[];
  regions: Region[];
  types: string[];
  rarities: PokemonRarity[];
  generations: Generation[];
}

export const PokemonPage = ({ pokemonList, regions, types, rarities, generations }: Props) => {
  const [isPending, setIsPending] = useState(false);

  return (
    <Container className="py-8">
      <Suspense>
        <PokemonFilters
          regions={regions}
          types={types}
          rarities={rarities}
          generations={generations}
          onPendingChange={setIsPending}
        />
      </Suspense>

      <div
        className={cn(
          'transition-opacity duration-200',
          isPending && 'opacity-40 pointer-events-none',
        )}
      >
        <PokemonCardList
          items={pokemonList.data}
          CardComponent={PokemonCard}
          isPending={isPending}
        />
      </div>

      <Suspense>
        <Pagination
          page={pokemonList.page}
          totalPages={pokemonList.totalPages}
          onPendingChange={setIsPending}
        />
      </Suspense>
    </Container>
  );
};
