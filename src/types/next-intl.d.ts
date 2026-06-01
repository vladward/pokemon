import en from '../../i18n/translations/en.json';

declare module 'use-intl' {
  interface AppConfig {
    Messages: typeof en;
  }
}
