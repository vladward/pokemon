'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
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
    // intentionally omits `value` — running on value change would fire onChange
    // before the user's own debounce resolves, causing a duplicate navigation
    if (debouncedValue !== (value ?? '')) onChangeRef.current(debouncedValue);
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

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
      className="max-w-[350px] tablet:max-w-[180px] h-full"
    />
  );
};
