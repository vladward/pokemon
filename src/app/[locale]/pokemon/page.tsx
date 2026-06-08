export const dynamic = 'force-dynamic';

import { PokemonPage } from '@/views/Pokemon';

import { getLocationList } from '@/entities/Location';
import {
  getPokemonList,
  getGenerationList,
  getRarityList,
  getTypeList,
  toSearchLocale,
  type SortBy,
  type SortOrder,
  type EvolutionStage,
} from '@/entities/Pokemon';
import { getRegionList } from '@/entities/Region';

type SearchParams = Promise<{
  search?: string;
  types?: string | string[];
  region?: string;
  generation?: string | string[];
  rarity?: string | string[];
  colors?: string | string[];
  habitat?: string | string[];
  shape?: string | string[];
  isBaby?: string;
  locationIds?: string | string[];
  evolutionStage?: string;
  page?: string;
  sortBy?: string;
  sortOrder?: string;
}>;

function toArray(v: string | string[] | undefined): string[] | undefined {
  if (!v) return undefined;
  if (Array.isArray(v)) return v.flatMap((s) => s.split(',')).filter(Boolean);
  return v.split(',').filter(Boolean);
}

type PageParams = Promise<{ locale: string }>;

export default async function Page({
  params: pageParams,
  searchParams,
}: {
  params: PageParams;
  searchParams: SearchParams;
}) {
  const [{ locale }, params] = await Promise.all([pageParams, searchParams]);
  const searchLocale = toSearchLocale(locale);

  const [pokemonList, locations, regions, types, rarities, generations] = await Promise.all([
    getPokemonList({
      search: params.search,
      searchLocale,
      types: toArray(params.types),
      generation: [
        ...(toArray(params.generation)?.map(Number).filter(Boolean) ?? []),
        ...(toArray(params.region)?.map(Number).filter(Boolean) ?? []),
      ],
      rarity: toArray(params.rarity),
      colors: toArray(params.colors),
      habitat: toArray(params.habitat),
      shape: toArray(params.shape),
      isBaby: params.isBaby === 'true' ? true : undefined,
      locationIds: toArray(params.locationIds)?.map(Number).filter(Boolean),
      evolutionStage: toArray(params.evolutionStage) as EvolutionStage[] | undefined,
      page: params.page ? Number(params.page) : 1,
      sortBy: (params.sortBy as SortBy) ?? 'id',
      sortOrder: (params.sortOrder as SortOrder) ?? 'asc',
    }),
    getLocationList(),
    getRegionList(),
    getTypeList(),
    getRarityList(),
    getGenerationList(),
  ]);

  return (
    <PokemonPage
      pokemonList={pokemonList}
      locations={locations}
      regions={regions}
      types={types}
      rarities={rarities}
      generations={generations}
    />
  );
}
