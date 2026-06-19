'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export const ActiveMobileTab = ({ path, children }: { path: string; children: ReactNode }) => {
  const pathname = usePathname();

  let isActive = false;

  const splitPathname = pathname.split('/');

  if (path === '/' && splitPathname.length === 2) {
    isActive = true;
  } else if (splitPathname.length > 2 && splitPathname[2] === path.slice(1, path.length)) {
    isActive = true;
  }

  return (
    <Link
      href={path}
      className={cn(
        'flex flex-col gap-1 justify-center items-center text-blue text-xs font-semibold opacity-65 transition-opacity',
        isActive && 'opacity-100',
        ' dark:hover:text-blue',
        'hover:opacity-100 hover:ease-in-out hover:duration-300',
      )}
    >
      {children}
    </Link>
  );
};
