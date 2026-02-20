import type { FC } from 'react';

import { Home } from '@/pages';

import { Layout } from '@/widgets/Layout';

import '@/shared/styles/index.scss';

export const App: FC = () => (
  <Layout>
    <Home />
  </Layout>
);
