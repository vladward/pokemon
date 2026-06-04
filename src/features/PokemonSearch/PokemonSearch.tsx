'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { Input } from '@/shared/ui';

type PokemonSearchProps = {
  value?: string;
  onChange: (value: string) => void;
};

export const PokemonSearch = ({ value, onChange }: PokemonSearchProps) => {
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(value ?? '');
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    if (debouncedValue !== (value ?? '')) onChange(debouncedValue);
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  if (!pathname.includes('pokemon')) return;

  return (
    <Input
      type="text"
      placeholder="Search Pokémon..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      className="max-w-[350px] tablet:max-w-[180px] h-full"
    />
  );
};
