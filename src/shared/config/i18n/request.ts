import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, LOCALE_COOKIE, locales } from './config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value ?? defaultLocale;
  const locale = (locales as readonly string[]).includes(raw) ? raw : defaultLocale;

  return {
    locale,
    messages: (await import(`@i18n/translations/${locale}.json`)).default,
  };
});
