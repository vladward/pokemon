import type { Metadata } from 'next';
import { Geist, Josefin_Sans } from 'next/font/google';
import { getLocale, getMessages } from 'next-intl/server';

import { I18nProvider } from '@/app/_providers/I18nProvider';
import { ThemeProvider } from '@/app/_providers/ThemeProvider';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import { cn } from '@/shared/lib/utils';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: 'Pokemon Repo',
  description: 'Приложение со списком покемонов на Next.js',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn('font-sans', geist.variable, josefinSans.variable)}
    >
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){document.body.classList.add('theme-ready')},100)`,
          }}
        />
        <I18nProvider
          locale={locale}
          messages={messages as Record<string, unknown>}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
