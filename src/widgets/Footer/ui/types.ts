import { ReactNode } from 'react';

export type MobileTabString = 'home' | 'pokemon' | 'game';

export type MobileTabProps = {
  name: MobileTabString;
  icon: ReactNode;
  path: string;
};

export type MobileTabsProps = {
  tabs: MobileTabProps[];
};
