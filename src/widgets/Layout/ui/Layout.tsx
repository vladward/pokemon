import React, { FC } from 'react';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';

export const Layout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
