export const locales = ['en', 'ru', 'de', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export const TIMEZONE = 'Europe/Warsaw' as const;
