import { Geist, JetBrains_Mono, Josefin_Sans, Orbitron } from 'next/font/google';

import { ThemeProvider } from '@/app/_providers/ThemeProvider';

import { cn } from '@/shared/lib/utils';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const josefinSans = Josefin_Sans({ subsets: ['latin'], variable: '--font-primary' });
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['700', '900'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
});

export const metadata = {
  title: 'Pokemon Repo',
  description: 'Приложение со списком покемонов на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={cn(
        'font-sans',
        geist.variable,
        josefinSans.variable,
        orbitron.variable,
        jetbrainsMono.variable,
      )}
    >
      <head>
        <link
          rel="preconnect"
          href="https://raw.githubusercontent.com"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
