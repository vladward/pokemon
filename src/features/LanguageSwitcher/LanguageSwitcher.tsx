'use client';

import { useLocale } from 'next-intl';

import { locales } from '@/shared/config/i18n';
import { DropdownMenuBasic } from '@/shared/ui/shadcn/dropdown';

import { setLocale } from './actions';

export const LanguageSwitcher = () => {
  const locale = useLocale();

  return (
    <DropdownMenuBasic
      trigger={locale.toUpperCase().slice(0, 2)}
      groups={[
        {
          items: locales.map((loc) => ({
            label: loc.toUpperCase(),
            onClick: () => setLocale(loc),
          })),
        },
      ]}
    />
  );
};
