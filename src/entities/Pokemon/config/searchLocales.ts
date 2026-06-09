export const SEARCH_LOCALES = [
  'en',
  'ru',
  'de',
  'es',
  'fr',
  'it',
  'ja',
  'ja-hrkt',
  'ja-roma',
  'ko',
  'zh-hans',
  'zh-hant',
] as const;

export type SearchLocale = (typeof SEARCH_LOCALES)[number];

// Locales not in SEARCH_LOCALES fall back to 'en'.
export function toSearchLocale(locale: string): SearchLocale {
  return (SEARCH_LOCALES as readonly string[]).includes(locale) ? (locale as SearchLocale) : 'en';
}
