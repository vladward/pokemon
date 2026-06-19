import { getTranslations } from 'next-intl/server';
import React from 'react';

import { MobileTabProps } from '../types';

export async function MobileTab({ name, icon }: Omit<MobileTabProps, 'path'>) {
  const t = await getTranslations('footer');
  return (
    <>
      {icon}
      {t(name)}
    </>
  );
}
