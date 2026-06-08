'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export type PokemonFilters = {
  search?: string;
  types?: string[];
  region?: string[];
  rarity?: string[];
  generation?: string[];
  evolutionStage?: string;
};

function parseMulti(value: string | null): string[] | undefined {
  if (!value) return undefined;
  const arr = value.split(',').filter(Boolean);
  return arr.length ? arr : undefined;
}

export function usePokemonFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters: PokemonFilters = {
    search: searchParams.get('search') || undefined,
    types: parseMulti(searchParams.get('types')),
    region: parseMulti(searchParams.get('region')),
    rarity: parseMulti(searchParams.get('rarity')),
    generation: parseMulti(searchParams.get('generation')),
    evolutionStage: searchParams.get('evolutionStage') || undefined,
  };

  const setFilters = (next: Partial<PokemonFilters>) => {
    const params = new URLSearchParams(searchParams.toString());

    const setStr = (key: string, value?: string) => {
      if (value === undefined) return;
      if (value === '') params.delete(key);
      else params.set(key, value);
    };

    const setArr = (key: string, value?: string[]) => {
      if (value === undefined) return;
      if (value.length === 0) params.delete(key);
      else params.set(key, value.join(','));
    };

    setStr('search', next.search);
    setArr('types', next.types);
    setArr('region', next.region);
    setArr('rarity', next.rarity);
    setArr('generation', next.generation);
    setStr('evolutionStage', next.evolutionStage);

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
