'use client';

import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PokemonButton: FC<{ children?: ReactNode | string } & ButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={cn(
        'bg-yellow text-lightBlue border-[3px] border-lightBlue rounded-[50px] px-[35px] py-[15px]',
        'font-bold uppercase cursor-pointer',
        'shadow-[0_6px_0_#c7a008] transition-all duration-100 ease-in',
        'active:shadow-[0_2px_0_#c7a008] active:translate-y-1',
        'hover:opacity-80',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
