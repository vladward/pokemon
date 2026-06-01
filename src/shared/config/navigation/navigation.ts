import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from '@/shared/config/i18n';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
