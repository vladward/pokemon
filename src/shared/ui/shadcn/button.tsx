'use client';

import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

type ButtonVariant = 'default' | 'outline' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-yellow text-lightBlue border-[3px] border-lightBlue shadow-[0_6px_0_#c7a008] active:shadow-[0_2px_0_#c7a008] active:translate-y-1',
  outline: 'bg-transparent text-lightBlue border-[3px] border-lightBlue',
  ghost: 'bg-transparent text-lightBlue border-0 shadow-none',
};

export const Button: FC<ButtonProps> = ({ className, children, variant = 'default', ...rest }) => (
  <button
    className={cn(
      'rounded-[50px] px-[35px] py-[15px] font-bold uppercase cursor-pointer',
      'transition-all duration-100 ease-in',
      variants[variant],
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);
