import { Suspense } from 'react';

import type { getLocationList } from '@/entities/Location';
import type {
  getGenerationList,
  getPokemonList,
  getRarityList,
  getTypeList,
} from '@/entities/Pokemon';
import type { getRegionList } from '@/entities/Region';

import { PokemonFilters } from './PokemonFilters';

interface Props {
  pokemonList: Awaited<ReturnType<typeof getPokemonList>>;
  locations: Awaited<ReturnType<typeof getLocationList>>;
  regions: Awaited<ReturnType<typeof getRegionList>>;
  types: Awaited<ReturnType<typeof getTypeList>>;
  rarities: Awaited<ReturnType<typeof getRarityList>>;
  generations: Awaited<ReturnType<typeof getGenerationList>>;
}

export const PokemonPage = ({ regions, types, rarities, generations }: Props) => {
  return (
    <div>
      <Suspense>
        <PokemonFilters
          regions={regions}
          types={types}
          rarities={rarities}
          generations={generations}
        />
      </Suspense>
    </div>
  );
};
