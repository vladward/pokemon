import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';

import { ThemeProvider } from '@/app/_providers/ThemeProvider';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import './globals.css';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: 'Pokemon Repo',
  description: 'Приложение со списком покемонов на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={josefinSans.variable}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('DOMContentLoaded',function(){setTimeout(function(){document.body.classList.add('theme-ready')},100)})`,
          }}
        />
      </head>
      <body>
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
      </body>
    </html>
  );
}
