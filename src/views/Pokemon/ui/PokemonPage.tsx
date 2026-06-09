import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { ToTopButton } from '@/features/ToTopButton';

import type { Location } from '@/entities/Location';
import type { Generation, PokemonListResult, PokemonRarity } from '@/entities/Pokemon';
import type { Region } from '@/entities/Region';

import { Container } from '@/shared/ui';

import { PendingProvider } from '../lib/PendingContext';

import { PokemonCardContainer } from './PokemonCardContainer';
import { PokemonCardList } from './PokemonCardList';
import { PokemonFilters } from './PokemonFilters';
import { PokemonPagination } from './PokemonPagination';

interface Props {
  pokemonList: PokemonListResult;
  locations: Location[];
  regions: Region[];
  types: string[];
  rarities: PokemonRarity[];
  generations: Generation[];
}

export const PokemonPage = async ({
  pokemonList,
  regions,
  types,
  rarities,
  generations,
}: Props) => {
  const t = await getTranslations('pages.pokemon');

  return (
    <PendingProvider>
      <Container className="py-8 tablet:px-4 mobile:px-4">
        <div className="flex items-baseline gap-3 mb-1">
          <h1 className="text-3xl font-bold tablet:text-2xl">{t('browse_title')}</h1>
          <span className="text-sm text-muted-foreground">{pokemonList.total}</span>
        </div>
        <Suspense>
          <PokemonFilters
            regions={regions}
            types={types}
            rarities={rarities}
            generations={generations}
          />
        </Suspense>

        <PokemonCardContainer isEmpty={pokemonList.data.length === 0}>
          <PokemonCardList items={pokemonList.data} />
        </PokemonCardContainer>

        <Suspense>
          <PokemonPagination
            page={pokemonList.page}
            totalPages={pokemonList.totalPages}
          />
        </Suspense>
      </Container>
      <ToTopButton />
    </PendingProvider>
  );
};
