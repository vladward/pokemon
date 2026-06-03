import { getTranslations } from 'next-intl/server';

import type { getLocationList } from '@/entities/Location/api/getLocationList';
import type { getPokemonList } from '@/entities/Pokemon/api/getPokemonList';
import type { getRegionList } from '@/entities/Region/api/getRegionList';

interface Props {
  pokemonList: Awaited<ReturnType<typeof getPokemonList>>;
  locations: Awaited<ReturnType<typeof getLocationList>>;
  regions: Awaited<ReturnType<typeof getRegionList>>;
}

export const PokemonPage = async ({ pokemonList, locations, regions }: Props) => {
  const t = await getTranslations('pages');
  const { data, total, page, totalPages } = pokemonList;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <h1 className="text-[3rem] font-bold text-lightBlue mb-4">{t('pokemon.title')}</h1>
      <p className="text-[1.1rem] max-w-[500px]">{t('pokemon.description')}</p>
      <p className="mt-4 text-sm opacity-60">
        {data.length} of {total} Pokémon — page {page} / {totalPages}
      </p>
      <p className="mt-1 text-sm opacity-60">
        {locations.length} locations · {regions.length} regions available
      </p>
    </div>
  );
};
