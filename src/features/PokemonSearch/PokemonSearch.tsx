'use client';

import { usePathname } from 'next/navigation';

import { Input } from '@/shared/ui';

type PokemonSearchProps = {
  value?: string;
  onChange: (value: string) => void;
};

export const PokemonSearch = ({ value, onChange }: PokemonSearchProps) => {
  const pathname = usePathname();

  if (!pathname.includes('pokemon')) return;

  return (
    <Input
      type="text"
      placeholder="Search Pokémon..."
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-[350px] tablet:max-w-[180px] h-full"
    />
  );
};
