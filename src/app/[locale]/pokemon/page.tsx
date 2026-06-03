export const dynamic = 'force-dynamic';

import { PokemonPage } from '@/views/Pokemon';

import { getLocationList } from '@/entities/Location';
import { getPokemonList, type SortBy, type SortOrder } from '@/entities/Pokemon';
import { getRegionList } from '@/entities/Region';

type SearchParams = Promise<{
  search?: string;
  types?: string | string[];
  generation?: string | string[];
  rarity?: string | string[];
  colors?: string | string[];
  habitat?: string | string[];
  shape?: string | string[];
  isBaby?: string;
  locationIds?: string | string[];
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}>;

function toArray(v: string | string[] | undefined): string[] | undefined {
  if (!v) return undefined;
  return Array.isArray(v) ? v : [v];
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const [pokemonList, locations, regions] = await Promise.all([
    getPokemonList({
      search: params.search,
      types: toArray(params.types),
      generation: toArray(params.generation)?.map(Number).filter(Boolean),
      rarity: toArray(params.rarity),
      colors: toArray(params.colors),
      habitat: toArray(params.habitat),
      shape: toArray(params.shape),
      isBaby: params.isBaby === 'true' ? true : undefined,
      locationIds: toArray(params.locationIds)?.map(Number).filter(Boolean),
      page: params.page ? Number(params.page) : 1,
      sortBy: (params.sortBy as SortBy) ?? 'id',
      sortOrder: (params.sortOrder as SortOrder) ?? 'asc',
    }),
    getLocationList(),
    getRegionList(),
  ]);

  return (
    <PokemonPage
      pokemonList={pokemonList}
      locations={locations}
      regions={regions}
    />
  );
}
