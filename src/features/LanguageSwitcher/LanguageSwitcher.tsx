'use client';

import { useLocale } from 'next-intl';

import { Locale } from '@/shared/config/i18n';
import { usePathname, useRouter, routing } from '@/shared/config/navigation';
import { DropdownMenuBasic } from '@/shared/ui/shadcn/dropdown';

import { setLocale } from './actions';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = (newLocale: string) => {
    router.replace({ pathname }, { locale: newLocale, scroll: false });
    setLocale(newLocale as Locale);
  };

  return (
    <DropdownMenuBasic
      trigger={locale.toUpperCase().slice(0, 2)}
      groups={[
        {
          items: routing.locales.map((loc) => ({
            label: loc.toUpperCase(),
            onClick: () => handleChangeLocale(loc),
          })),
        },
      ]}
    />
  );
};
