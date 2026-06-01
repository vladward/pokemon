import { getMessages } from 'next-intl/server';

import { I18nProvider } from '@/app/_providers/I18nProvider';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import { locales } from '@/shared/config/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children?: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <I18nProvider
      locale={locale}
      messages={messages as Record<string, unknown>}
    >
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
