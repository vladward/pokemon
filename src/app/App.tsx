import type { FC } from 'react';

import { Layout } from '@/app/layout';
import { Home } from '@/app/pages';

import { Header } from '@/widgets/Header';

import './global.scss';

export const App: FC = () => {
  return (
    <div>
      <Header />
      <Layout>
        <Home />
      </Layout>
    </div>
  );
};
