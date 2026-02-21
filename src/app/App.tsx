import type { FC } from 'react';

import { Home } from '@/pages';

import { ThemeProvider } from '@/app/providers/ThemeProvider';

import { Layout } from '@/widgets/Layout';

import '@/shared/styles/index.scss';

export const App: FC = () => (
  <ThemeProvider>
    <Layout>
      <Home />
    </Layout>
  </ThemeProvider>
);
