import { ReactNode } from 'react';

export const useTranslations = () => (key: string) => key;

export const useLocale = () => 'en';

export const NextIntlClientProvider = ({ children }: { children: ReactNode }) => children;
