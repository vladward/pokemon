import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import type { PokemonRarity } from '../../../config';
import type { TPokemonCard as PokemonCardType } from '../../../TPokemonCard';
import {
  rarityConfig,
  typeBadgeColors,
  getGradientClasses,
  LIGHT_BG_TYPES,
  LIGHT_BG_BADGE_TEXT,
} from '../config';
import { PokeBallPlaceholder } from '../PokeBallPlaceholder';
import { RarityStars } from '../RarityStars';
import { TiltWrapper } from '../TiltWrapper';

interface Props {
  pokemon: PokemonCardType;
  priority?: boolean;
}

export const PokemonCardBase = async ({ pokemon, priority }: Props) => {
  const image = pokemon.spriteDreamWorld ?? pokemon.spriteArtwork ?? pokemon.sprite;
  const gradient = getGradientClasses(pokemon.types);
  const rarity = rarityConfig[pokemon.rarity];
  const isUncommon = pokemon.rarity === 'uncommon';
  const isRare = pokemon.rarity === 'rare';
  const isLightBgType = LIGHT_BG_TYPES.has(pokemon.types[0]);

  const tCard = await getTranslations('pokemon_card');
  const tTypes = await getTranslations('elements');

  const rarityLabel = (r: PokemonRarity) => tCard(`rarity.${r}` as `rarity.${PokemonRarity}`);
  const stageLabel = (s: NonNullable<PokemonCardType['evolutionStage']>) =>
    tCard(
      `evolution_stage.${s}` as `evolution_stage.${NonNullable<PokemonCardType['evolutionStage']>}`,
    );
  const typeLabel = (type: string) => tTypes(type as Parameters<typeof tTypes>[0]);

  const pastelWhite = isRare
    ? 'from-white/20 via-white/10 to-transparent'
    : isUncommon
      ? 'from-white/35 via-white/20 to-white/10'
      : 'from-white/60 via-white/45 to-white/20';

  const pearlStyle: CSSProperties | null =
    isRare && !isLightBgType
      ? {
          background:
            'linear-gradient(105deg, transparent 0%, rgba(139,92,246,0.5) 20%, rgba(255,255,255,0.35) 42%, rgba(167,139,250,0.45) 65%, transparent 100%)',
          backgroundSize: '300% 300%',
        }
      : isUncommon && !isLightBgType
        ? {
            background:
              'linear-gradient(105deg, transparent 0%, rgba(200,230,255,0.45) 25%, rgba(255,255,255,0.35) 45%, rgba(200,255,235,0.35) 65%, transparent 100%)',
            backgroundSize: '300% 300%',
          }
        : null;

  return (
    <TiltWrapper
      className={cn(
        'group relative cursor-pointer rounded-[20px] w-[240px] h-[336px] mobile:w-full mobile:h-[200px]',
        `bg-gradient-to-br ${gradient}`,
        'shadow-[0_4px_28px_rgba(0,0,0,0.13),_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-none',
      )}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full blur-xl transition-all duration-500',
          `bg-gradient-to-r ${gradient}`,
          '-bottom-3 h-6 w-3/4 opacity-40 group-hover:opacity-65 group-hover:-bottom-4 group-hover:h-8',
          'dark:-bottom-4 dark:h-8 dark:w-4/5 dark:opacity-60 dark:group-hover:opacity-90 dark:group-hover:-bottom-5',
        )}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] mobile:justify-between">
        <div
          className={cn(
            'pointer-events-none absolute inset-0 bg-gradient-to-b dark:hidden',
            pastelWhite,
          )}
        />

        {pearlStyle && (
          <div
            className="pointer-events-none absolute inset-0 animate-irid-shimmer motion-reduce:animate-none dark:hidden"
            style={pearlStyle}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 hidden dark:block"
          style={{
            background:
              'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(to bottom right, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[32%] rounded-b-[20px] hidden dark:block"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.52), transparent)' }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:hidden"
          style={{
            background:
              'radial-gradient(400px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.2), transparent 60%)',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hidden dark:block"
          style={{
            background:
              'radial-gradient(400px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.18), transparent 55%)',
          }}
        />

        <div className="pointer-events-none absolute top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent left-[10%] right-[10%] dark:left-[8%] dark:right-[8%]" />

        <div className="relative z-10 flex items-start justify-between px-4 pt-4 mobile:hidden">
          <span
            className={cn(
              'font-mono text-[13px] font-semibold tracking-widest',
              isLightBgType
                ? 'text-slate-500 dark:text-white/70 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                : 'text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] dark:text-white/70 dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]',
            )}
          >
            #{String(pokemon.id).padStart(4, '0')}
          </span>
          <div className="flex flex-wrap justify-center gap-1">
            {pokemon.types.map((type) => {
              const tc = typeBadgeColors[type] ?? typeBadgeColors['normal'];
              return (
                <span
                  key={type}
                  className={cn(
                    'rounded-full border px-2 py-[3px] text-[11px] font-bold leading-none capitalize tracking-widest backdrop-blur-sm',
                    tc.bg,
                    tc.border,
                    LIGHT_BG_BADGE_TEXT[type] ?? tc.text,
                    'dark:bg-black/25 dark:border-white/30 dark:text-white',
                  )}
                >
                  {typeLabel(type)}
                </span>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 px-4 pt-1 mobile:px-3 mobile:pt-[10px] mobile:text-center">
          <h3
            className={cn(
              'text-l capitalize leading-tight tracking-wide line-clamp-2 overflow-hidden text-ellipsis',
              isLightBgType
                ? 'font-bold text-slate-800 dark:font-black dark:text-white dark:drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
                : 'font-bold text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)] dark:font-black dark:drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]',
            )}
          >
            {pokemon.name}
          </h3>
          {pokemon.evolutionStage && (
            <span
              className={cn(
                'text-[11px] font-semibold tracking-widest uppercase mobile:hidden',
                isLightBgType ? 'text-slate-400 dark:text-white/50' : 'text-white/50',
              )}
            >
              {stageLabel(pokemon.evolutionStage)}
            </span>
          )}
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-2 mobile:flex-none mobile:py-0">
          {image ? (
            <Image
              src={image}
              alt={pokemon.name}
              width={160}
              height={160}
              priority={priority}
              className="h-[160px] w-[160px] mobile:h-[98px] mobile:w-[98px] select-none object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)] dark:group-hover:drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
              style={{ willChange: 'transform', transform: 'translateZ(12px)' }}
            />
          ) : (
            <PokeBallPlaceholder />
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/30 px-4 pt-[10px] pb-[14px] dark:border-white/20 dark:py-3.5 mobile:px-3 mobile:py-2 mobile:dark:py-2">
          <span
            className={cn(
              'rounded-md border px-2.5 pt-[7px] pb-[5px] text-[11px] mobile:text-[9px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
              rarity.border,
              rarity.bg,
              rarity.glow,
            )}
            style={{ color: rarity.color }}
          >
            {rarityLabel(pokemon.rarity)}
          </span>
          <div className="mobile:hidden">
            {rarity.stars > 0 && (
              <RarityStars
                count={rarity.stars}
                color={rarity.color}
              />
            )}
          </div>
        </div>
      </div>
    </TiltWrapper>
  );
};
