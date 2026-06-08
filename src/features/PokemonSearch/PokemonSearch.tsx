'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { Input } from '@/shared/ui';

type PokemonSearchProps = {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const PokemonSearch = ({ value, onChange, disabled }: PokemonSearchProps) => {
  const t = useTranslations('pokemon_filters');
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState(value ?? '');
  const debouncedValue = useDebounce(inputValue, 800);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (debouncedValue !== (value ?? '')) onChangeRef.current(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  if (!pathname.includes('pokemon')) return null;

  return (
    <Input
      type="text"
      placeholder={t('search_placeholder')}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      readOnly={disabled}
      className="max-w-[350px] min-w-[150px] tablet:max-w-[180px] h-full mobile:flex-1 mobile:max-w-none mobile:min-w-0"
    />
  );
};
