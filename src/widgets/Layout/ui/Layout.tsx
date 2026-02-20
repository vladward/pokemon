import React, { FC } from 'react';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

import styles from './Layout.module.scss';

export const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
