import React from 'react';

import { TPokemonCard } from '@/entities/Pokemon';
import { RarityStars } from '@/entities/Pokemon/ui/card/RarityStars';

import { cn } from '@/shared/lib/utils';

import { rarityConfig } from './config';

interface PokemonRarityFooterProps {
  rarityType: TPokemonCard['rarity'];
  label: string;
  showStars?: boolean;
  className?: string;
  badgeClassName?: string;
}

export const RarityLabel: React.FC<PokemonRarityFooterProps> = ({
  rarityType,
  label,
  showStars = true,
  className = 'px-4 pt-[10px] pb-[14px]',
  badgeClassName,
}) => {
  const config = rarityConfig[rarityType];

  if (!config) return null;

  const isLegendary = rarityType === 'legendary';
  const isMythical = rarityType === 'mythical';
  const isBase = !isLegendary && !isMythical;

  return (
    <div
      className={cn(
        'relative z-10 flex items-center justify-between mobile:px-3 mobile:py-2',
        {
          'border-t border-white/20': isLegendary,
          'border-t border-white/10': isMythical,
          'border-t border-white/30 dark:border-white/20 dark:py-3.5 mobile:dark:py-2': isBase,
        },
        className,
      )}
    >
      <span
        className={cn(
          'rounded-md border px-2.5 pt-[7px] pb-[5px] text-[11px] mobile:text-[9px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
          config.glow,
          isLegendary ? 'border-white/30 bg-black/25 text-white' : `${config.border} ${config.bg}`,
          badgeClassName,
        )}
        style={!isLegendary ? { color: config.color } : undefined}
      >
        {label}
      </span>

      {showStars && (
        <div className="mobile:hidden">
          {config.stars > 0 && (
            <RarityStars
              count={config.stars}
              color={isLegendary ? 'rgba(255,255,255,0.8)' : config.color}
            />
          )}
        </div>
      )}
    </div>
  );
};
