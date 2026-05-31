'use client';

import { cn } from '@/shared/lib/utils/cn';

type BurgerButtonProps = {
  isActive: boolean;
  onClick?: () => void;
};

export const BurgerButton = ({ isActive, onClick }: BurgerButtonProps) => (
  <button
    data-active={isActive}
    className="relative w-[30px] h-[20px] bg-transparent border-0 cursor-pointer z-[1001] hover:opacity-70 transition-opacity duration-200 text-blue"
    onClick={onClick}
    aria-label="Toggle menu"
  >
    <span
      className={cn(
        'absolute left-0 w-full h-[2px] bg-current transition-all duration-300 ease-in-out top-0',
        isActive && 'translate-y-[9px] rotate-45',
      )}
    />
    <span
      className={cn(
        'absolute left-0 w-full h-[2px] bg-current transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2',
        isActive && 'opacity-0',
      )}
    />
    <span
      className={cn(
        'absolute left-0 w-full h-[2px] bg-current transition-all duration-300 ease-in-out bottom-0',
        isActive && '-translate-y-[9px] -rotate-45',
      )}
    />
  </button>
);
