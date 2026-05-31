import type { FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container: FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('max-w-[1440px] mx-auto px-20 w-full mobile:px-10', className)}>
      {children}
    </div>
  );
};
