'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export type PokemonFilters = {
  search?: string;
  types?: string;
  region?: string;
  rarity?: string;
  generation?: string;
  evolutionStage?: string;
};

export function usePokemonFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters: PokemonFilters = {
    search: searchParams.get('search') || undefined,
    types: searchParams.get('types') || undefined,
    region: searchParams.get('region') || undefined,
    rarity: searchParams.get('rarity') || undefined,
    generation: searchParams.get('generation') || undefined,
    evolutionStage: searchParams.get('evolutionStage') || undefined,
  };

  const setFilters = (next: Partial<PokemonFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    const set = (key: string, value?: string) => {
      if (value === undefined) return;
      if (value === '') params.delete(key);
      else params.set(key, value);
    };

    set('search', next.search);
    set('types', next.types);
    set('region', next.region);
    set('rarity', next.rarity);
    set('generation', next.generation);
    set('evolutionStage', next.evolutionStage);

    params.delete('page');

    startTransition(() => router.push(`?${params.toString()}`));
  };

  const resetFilters = () => {
    startTransition(() => router.push('?'));
  };

  return {
    filters,
    setFilters,
    resetFilters,
    isPending,
  };
}
