'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

type Props = {
  locale: string;
  messages: Record<string, unknown>;
  children: ReactNode;
};

export const I18nProvider = ({ locale, messages, children }: Props) => (
  <NextIntlClientProvider
    locale={locale}
    messages={messages}
  >
    {children}
  </NextIntlClientProvider>
);
