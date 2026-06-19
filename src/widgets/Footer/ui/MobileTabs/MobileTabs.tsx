import React from 'react';

import { ActiveMobileTab } from '@/widgets/Footer/ui/MobileTabs/ActiveMobileTab';

import { MobileTabsProps } from '../types';

import { MobileTab } from './MobileTab';

export const MobileTabs = ({ tabs }: MobileTabsProps) => (
  <div className="justify-around items-center hidden mobile:flex">
    {tabs.map(({ name, path, icon }) => {
      return (
        <ActiveMobileTab
          key={name}
          path={path}
        >
          <MobileTab
            name={name}
            icon={icon}
          />
        </ActiveMobileTab>
      );
    })}
  </div>
);
