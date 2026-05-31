'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { Locale, LOCALE_COOKIE, locales } from '@/shared/config/i18n';

export async function setLocale(locale: Locale) {
  if (!(locales as readonly string[]).includes(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
  });

  revalidatePath('/', 'layout');
}
