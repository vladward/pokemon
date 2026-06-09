'use client';

import { cn } from '@/shared/lib/utils/cn';

import { usePending } from '../lib/PendingContext';

import { PokemonLoader } from './PokemonLoader';

interface Props {
  children: React.ReactNode;
  isEmpty: boolean;
}

export const PokemonCardContainer = ({ children, isEmpty }: Props) => {
  const { isPending } = usePending();

  return (
    <div
      className={cn(
        'transition-opacity duration-200',
        isPending && 'opacity-40 pointer-events-none',
      )}
    >
      {isPending && isEmpty ? <PokemonLoader /> : children}
    </div>
  );
};
