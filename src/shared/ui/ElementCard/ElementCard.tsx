'use client';

import { useTranslations } from 'next-intl';
import { FC, ReactNode } from 'react';
import type { MessageKeys, Messages, NestedKeyOf } from 'use-intl/core';

import { cn } from '@/shared/lib/utils/cn';

type MessageKey = MessageKeys<Messages, NestedKeyOf<Messages>>;

interface PokemonTypeCardProps {
  name: MessageKey;
  color: string;
  image: ReactNode | string;
  onClick?: () => void;
}

export const ElementCard: FC<PokemonTypeCardProps> = ({ name, color, image, onClick }) => {
  const t = useTranslations();
  return (
    <div
      className={cn(
        'group flex flex-col items-center justify-center px-[10px] py-[30px] rounded-2xl',
        'bg-background border-[3px] cursor-pointer select-none',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        '[border-color:var(--type-color)] [box-shadow:0_4px_0_var(--type-color)]',
        'hover:-translate-y-1 hover:[background-color:var(--type-color)] hover:[box-shadow:0_6px_15px_rgba(0,0,0,0.1)]',
        'active:translate-y-0.5 active:[box-shadow:0_1px_0_var(--type-color)]',
      )}
      style={{ '--type-color': color } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="flex items-center justify-center mb-2">
        <div
          className={cn(
            'p-5 rounded-full [background:var(--type-color)]',
            'transition-all duration-300',
            'group-hover:scale-[1.15] group-hover:rotate-[5deg]',
          )}
        >
          <div className="transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert">
            {image}
          </div>
        </div>
      </div>
      <span
        className={cn(
          'font-extrabold text-[0.85rem] uppercase tracking-[0.5px]',
          'transition-colors duration-300',
          '[color:var(--type-color)] group-hover:text-white',
        )}
      >
        {t(name)}
      </span>
    </div>
  );
};
