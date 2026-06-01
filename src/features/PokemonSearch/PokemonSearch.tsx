'use client';

import { usePathname } from 'next/navigation';

import { usePokemonStore } from '@/entities/Pokemon';

import { Input } from '@/shared/ui';

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
