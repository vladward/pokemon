'use client';

import { usePathname } from 'next/navigation';

import { Input } from '@/shared/ui';

import { usePokemonStore } from './model';

export const PokemonSearch = () => {
  const search = usePokemonStore((state) => state.search);
  const setSearch = usePokemonStore((state) => state.setSearch);
  const pathname = usePathname();

  if (!pathname.includes('pokemon')) return;

  return (
    <Input
      type="text"
      placeholder="Search Pokémon..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="max-w-[350px] tablet:max-w-[180px]"
    />
  );
};
