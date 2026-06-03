'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type PokemonFilters = {
  search?: string;
  type?: string;
  region?: string;
  rarity?: string;
  generation?: string;
};

export function usePokemonFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: PokemonFilters = {
    search: searchParams.get('search') || undefined,
    type: searchParams.get('type') || undefined,
    region: searchParams.get('region') || undefined,
    rarity: searchParams.get('rarity') || undefined,
    generation: searchParams.get('generation') || undefined,
  };

  const setFilters = (next: Partial<PokemonFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    const set = (key: string, value?: string) => {
      if (value === undefined) return;

      if (value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    };

    set('search', next.search);
    set('type', next.type);
    set('region', next.region);
    set('rarity', next.rarity);
    set('generation', next.generation);

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push('?');
  };

  return {
    filters,
    setFilters,
    resetFilters,
  };
}
