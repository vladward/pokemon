'use client';

import { HOME_PAGE_TO_TOP_SIZE } from '@/shared/constants/constants';
import { PokemonButton } from '@/shared/ui';

interface ScrollButtonProps {
  label: string;
}

export const ScrollButton = ({ label }: ScrollButtonProps) => (
  <PokemonButton
    className="transition-all duration-300 hover:scale-[1.02] tablet:hidden mobile:hidden"
    onClick={() => window.scrollTo({ top: HOME_PAGE_TO_TOP_SIZE })}
  >
    {label}
  </PokemonButton>
);
