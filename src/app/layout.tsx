import { Geist, Josefin_Sans } from 'next/font/google';

import { ThemeProvider } from '@/app/_providers/ThemeProvider';

import { cn } from '@/shared/lib/utils';

import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const josefinSans = Josefin_Sans({ subsets: ['latin'], variable: '--font-primary' });

export const metadata = {
  title: 'Pokemon Repo',
  description: 'Приложение со списком покемонов на Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={cn('font-sans', geist.variable, josefinSans.variable)}
    >
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
