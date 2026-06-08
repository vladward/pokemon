import { Suspense } from 'react';

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

export const PokemonPage = ({ pokemonList, regions, types, rarities, generations }: Props) => {
  return (
    <PendingProvider>
      <Container className="py-8 tablet:px-4 mobile:px-4">
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
    </PendingProvider>
  );
};
