'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React from 'react';

import { cn } from '@/shared/lib/utils/cn';

import type { PokemonCard as PokemonCardType } from '../PokemonCard';
import type { PokemonRarity } from '../config';

import {
  rarityConfig,
  typeBadgeColors,
  getGradientClasses,
  LIGHT_BG_TYPES,
  LIGHT_BG_BADGE_TEXT,
  STAR_PATH,
} from './pokemonCardShared';
import { usePokemonCardTilt } from './usePokemonCardTilt';

interface Props {
  pokemon: PokemonCardType;
}

const RarityStars = ({ count, color }: { count: number; color: string }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="h-3.5 w-3.5" style={{ color }} viewBox="0 0 24 24" fill="currentColor">
        <path d={STAR_PATH} />
      </svg>
    ))}
  </div>
);

const MYTHICAL_STARS: Array<{ pos: React.CSSProperties; delay: string; size: string }> = [
  { pos: { top: '12%', left: '9%' }, delay: '0s', size: 'h-[3px] w-[3px]' },
  { pos: { top: '19%', right: '8%' }, delay: '0.8s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '30%', left: '5%' }, delay: '1.9s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '44%', right: '7%' }, delay: '0.4s', size: 'h-[3px] w-[3px]' },
  { pos: { top: '57%', left: '11%' }, delay: '2.5s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '70%', right: '12%' }, delay: '1.3s', size: 'h-[2px] w-[2px]' },
  { pos: { bottom: '15%', left: '28%' }, delay: '3.0s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '25%', left: '40%' }, delay: '1.6s', size: 'h-[2px] w-[2px]' },
];

const PokeBallPlaceholder = () => (
  <div className="flex h-[160px] w-[160px] items-center justify-center">
    <svg
      viewBox="0 0 100 100"
      className="h-[110px] w-[110px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
    >
      <path
        d="M4,50 A46,46 0 0,0 96,50 Z"
        fill="rgba(220,38,38,0.72)"
      />
      <path
        d="M4,50 A46,46 0 0,1 96,50 Z"
        fill="rgba(255,255,255,0.72)"
      />
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="rgba(15,15,15,0.4)"
        strokeWidth="4"
      />
      <rect
        x="4"
        y="44"
        width="92"
        height="12"
        fill="rgba(15,15,15,0.3)"
      />
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="rgba(15,15,15,0.35)"
      />
      <circle
        cx="50"
        cy="50"
        r="9"
        fill="rgba(255,255,255,0.9)"
      />
      <circle
        cx="46"
        cy="46"
        r="3"
        fill="rgba(255,255,255,0.55)"
      />
    </svg>
  </div>
);

export const PokemonCard = ({ pokemon }: Props) => {
  const { cardRef, handleMouseEnter, handleMouseMove, handleMouseLeave } = usePokemonCardTilt();

  const image = pokemon.spriteDreamWorld ?? pokemon.spriteArtwork ?? pokemon.sprite;
  const gradient = getGradientClasses(pokemon.types);
  const rarity = rarityConfig[pokemon.rarity];
  const isLegendary = pokemon.rarity === 'legendary';
  const isMythical = pokemon.rarity === 'mythical';
  const isUncommon = pokemon.rarity === 'uncommon';
  const isRare = pokemon.rarity === 'rare';
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const tCard = useTranslations('pokemon_card');
  const tTypes = useTranslations('elements');

  const rarityLabel = (r: PokemonRarity) => tCard(`rarity.${r}` as `rarity.${PokemonRarity}`);
  const stageLabel = (s: NonNullable<PokemonCardType['evolutionStage']>) =>
    tCard(`evolution_stage.${s}` as `evolution_stage.${NonNullable<PokemonCardType['evolutionStage']>}`);
  const typeLabel = (type: string) =>
    tTypes(type as Parameters<typeof tTypes>[0]);

  const header = (
    <div className="relative z-10 flex items-start justify-between px-4 pt-4">
      <span
        className={cn(
          'font-mono text-[13px] font-semibold tracking-widest',
          isLegendary ? 'text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]' : 'text-white/50',
        )}
      >
        #{String(pokemon.id).padStart(4, '0')}
      </span>
      <div className="flex flex-wrap justify-center gap-1">
        {pokemon.types.map((type) => {
          const tc = typeBadgeColors[type] ?? typeBadgeColors['normal'];
          return isLegendary ? (
            <span
              key={type}
              className="rounded-full border border-white/30 bg-black/25 px-2 py-[3px] text-[11px] font-bold leading-none capitalize tracking-widest text-white backdrop-blur-sm"
            >
              {typeLabel(type)}
            </span>
          ) : (
            <span
              key={type}
              className={cn(
                'rounded-full border px-2 py-[3px] text-[11px] font-bold leading-none capitalize tracking-widest backdrop-blur-sm',
                tc.bg,
                tc.border,
                tc.text,
              )}
            >
              {typeLabel(type)}
            </span>
          );
        })}
      </div>
    </div>
  );

  const name = (
    <div className="relative z-10 px-4 pt-1">
      <h3
        className={cn(
          'text-xl capitalize leading-tight tracking-wide text-white',
          isLegendary
            ? 'font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
            : 'font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]',
        )}
      >
        {pokemon.name}
      </h3>
      {pokemon.evolutionStage && (
        <span className="text-[11px] font-semibold tracking-widest text-white/50 uppercase">
          {stageLabel(pokemon.evolutionStage)}
        </span>
      )}
    </div>
  );

  const rarityBar = (
    <div
      className={cn(
        'relative z-10 flex items-center justify-between px-4 py-3.5',
        isLegendary ? 'border-t border-white/20' : 'border-t border-white/10',
      )}
    >
      <span
        className={cn(
          'rounded-md border px-2.5 py-[4px] text-[11px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
          isLegendary
            ? 'border-white/30 bg-black/25 text-white ' + rarity.glow
            : cn(rarity.border, rarity.bg, rarity.glow),
        )}
        style={isLegendary ? undefined : { color: rarity.color }}
      >
        {rarityLabel(pokemon.rarity)}
      </span>
      {rarity.stars > 0 && (
        <RarityStars
          count={rarity.stars}
          color={isLegendary ? 'rgba(255,255,255,0.8)' : rarity.color}
        />
      )}
    </div>
  );

  if (isLegendary) {
    return (
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative cursor-pointer rounded-[20px] w-[240px] h-[336px]',
          `bg-gradient-to-br ${gradient}`,
        )}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <div
          className={cn(
            'pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 w-4/5 rounded-full blur-xl opacity-60 transition-all duration-500 group-hover:opacity-90 group-hover:-bottom-5',
            `bg-gradient-to-r ${gradient}`,
          )}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-[20px] animate-edge-breathe motion-reduce:animate-none"
          style={{
            boxShadow: '0 0 0 1.5px rgba(253,224,71,0.7), 0 0 32px 6px rgba(250,204,21,0.4)',
          }}
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[20px]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(to bottom right, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(400px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.18), transparent 55%)',
            }}
          />

          <div
            className="pointer-events-none absolute -top-full left-0 h-[300%] w-8 animate-sovereign-shimmer motion-reduce:animate-none"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(255,255,255,0.65), rgba(255,255,255,0.4), rgba(255,255,255,0.65), transparent)',
            }}
          />

          <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

          {header}
          {name}

          <div className="relative z-10 flex flex-1 items-center justify-center py-2">
            <div
              className="pointer-events-none absolute inset-0 animate-corona-breathe motion-reduce:animate-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 58%, rgba(255,255,255,0.3), rgba(253,224,71,0.2) 40%, transparent 68%)',
              }}
            />
            {image ? (
              <img
                src={image}
                alt={pokemon.name}
                width={160}
                height={160}
                className="h-[160px] w-[160px] select-none object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(12px)',
                  filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.6))',
                }}
              />
            ) : (
              <PokeBallPlaceholder />
            )}
          </div>

          {rarityBar}
        </div>
      </div>
    );
  }

  if (isMythical) {
    return (
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative cursor-pointer rounded-[20px] bg-gradient-to-br p-[1.5px] w-[240px] h-[336px]',
          gradient,
        )}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <div
          className={cn(
            'pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-3/4 rounded-full blur-xl opacity-50 transition-all duration-500 group-hover:opacity-80 group-hover:-bottom-4',
            `bg-gradient-to-r ${gradient}`,
          )}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{
            boxShadow: '0 0 0 1px rgba(167,139,250,0.5), 0 0 28px 4px rgba(139,92,246,0.28)',
          }}
        />

        <div
          className={cn(
            'relative flex h-full flex-col overflow-hidden rounded-[18px]',
            'bg-gradient-to-b from-white/15 via-white/10 to-black/20 backdrop-blur-2xl',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(255,255,255,0.08),inset_1px_0_0_rgba(255,255,255,0.2),inset_-1px_0_0_rgba(255,255,255,0.1)]',
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(400px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.1), transparent 60%)',
            }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(15,10,30,0.55) 100%)',
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 animate-cosmic-pulse motion-reduce:animate-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 55%, rgba(139,92,246,0.3), rgba(109,40,217,0.15) 45%, transparent 70%)',
            }}
          />

          {MYTHICAL_STARS.map(({ pos, delay, size }, i) => (
            <div
              key={i}
              className={cn(
                'pointer-events-none absolute rounded-full bg-white animate-star-twinkle motion-reduce:animate-none',
                size,
              )}
              style={{ ...pos, animationDelay: delay }}
            />
          ))}

          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-4 -left-8 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          {header}
          {name}

          <div className="relative z-10 flex flex-1 items-center justify-center py-2">
            <div className="animate-ethereal-float motion-reduce:animate-none">
              {image ? (
                <img
                  src={image}
                  alt={pokemon.name}
                  width={160}
                  height={160}
                  className="h-[160px] w-[160px] select-none object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_20px_48px_rgba(139,92,246,0.5)]"
                  style={{
                    willChange: 'transform',
                    transform: 'translateZ(12px)',
                    filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.45))',
                  }}
                />
              ) : (
                <PokeBallPlaceholder />
              )}
            </div>
          </div>

          {rarityBar}
        </div>
      </div>
    );
  }

  if (isDark) {
    return (
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'group relative cursor-pointer rounded-[20px] w-[240px] h-[336px]',
          `bg-gradient-to-br ${gradient}`,
        )}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <div
          className={cn(
            'pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 h-8 w-4/5 rounded-full blur-xl opacity-60 transition-all duration-500 group-hover:opacity-90 group-hover:-bottom-5',
            `bg-gradient-to-r ${gradient}`,
          )}
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[20px]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.18), transparent 55%), linear-gradient(to bottom right, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(400px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.18), transparent 55%)',
            }}
          />
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-[32%] rounded-b-[20px]"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.52), transparent)' }}
          />

          <div className="relative z-10 flex items-start justify-between px-4 pt-4">
            <span className="font-mono text-[13px] font-semibold tracking-widest text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              #{String(pokemon.id).padStart(4, '0')}
            </span>
            <div className="flex flex-wrap justify-center gap-1">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/30 bg-black/25 px-2 py-[3px] text-[11px] font-bold leading-none capitalize tracking-widest text-white backdrop-blur-sm"
                >
                  {typeLabel(type)}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 px-4 pt-1">
            <h3 className="text-xl font-black capitalize leading-tight tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              {pokemon.name}
            </h3>
            {pokemon.evolutionStage && (
              <span className="text-[11px] font-semibold tracking-widest text-white/50 uppercase">
                {stageLabel(pokemon.evolutionStage)}
              </span>
            )}
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center py-2">
            {image ? (
              <img
                src={image}
                alt={pokemon.name}
                width={160}
                height={160}
                className="h-[160px] w-[160px] select-none object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(12px)',
                  filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.6))',
                }}
              />
            ) : (
              <PokeBallPlaceholder />
            )}
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/20 px-4 py-3.5">
            <span
              className={cn(
                'rounded-md border px-2.5 py-[4px] text-[11px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
                rarity.border,
                rarity.bg,
                rarity.glow,
              )}
              style={{ color: rarity.color }}
            >
              {rarityLabel(pokemon.rarity)}
            </span>
            {rarity.stars > 0 && (
              <RarityStars count={rarity.stars} color={rarity.color} />
            )}
          </div>
        </div>
      </div>
    );
  }

  const isLightBgType = LIGHT_BG_TYPES.has(pokemon.types[0]);

  const pastelWhite = isRare
    ? 'from-white/20 via-white/10 to-transparent'
    : isUncommon
      ? 'from-white/35 via-white/20 to-white/10'
      : 'from-white/60 via-white/45 to-white/20';

  const pearlStyle: React.CSSProperties | null =
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

  const idClass = isLightBgType
    ? 'font-mono text-[13px] font-semibold tracking-widest text-slate-500'
    : 'font-mono text-[13px] font-semibold tracking-widest text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]';
  const nameClass = isLightBgType
    ? 'text-xl font-bold capitalize leading-tight tracking-wide text-slate-800'
    : 'text-xl font-bold capitalize leading-tight tracking-wide text-white drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)]';
  const accentColor = isLightBgType
    ? isRare
      ? '#4c1d95'
      : isUncommon
        ? '#334155'
        : rarity.color
    : rarity.color;

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative cursor-pointer rounded-[20px] w-[240px] h-[336px]',
        `bg-gradient-to-br ${gradient}`,
      )}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 28px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.07)',
      }}
    >
      <div
        className={cn(
          'pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-3/4 rounded-full blur-xl opacity-40 transition-all duration-500 group-hover:opacity-65 group-hover:-bottom-4 group-hover:h-8',
          `bg-gradient-to-r ${gradient}`,
        )}
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px]">
        <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-b', pastelWhite)} />

        {pearlStyle && (
          <div
            className="pointer-events-none absolute inset-0 animate-irid-shimmer motion-reduce:animate-none"
            style={pearlStyle}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(400px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(255,255,255,0.2), transparent 60%)',
          }}
        />

        <div className="pointer-events-none absolute left-[10%] right-[10%] top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <div className="relative z-10 flex items-start justify-between px-4 pt-4">
          <span className={idClass}>#{String(pokemon.id).padStart(4, '0')}</span>
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
                  )}
                >
                  {typeLabel(type)}
                </span>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 px-4 pt-1">
          <h3 className={nameClass}>{pokemon.name}</h3>
          {pokemon.evolutionStage && (
            <span
              className={cn(
                'text-[11px] font-semibold tracking-widest uppercase',
                isLightBgType ? 'text-slate-400' : 'text-white/50',
              )}
            >
              {stageLabel(pokemon.evolutionStage)}
            </span>
          )}
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-2">
          {image ? (
            <img
              src={image}
              alt={pokemon.name}
              width={160}
              height={160}
              className="h-[160px] w-[160px] select-none object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
              style={{ willChange: 'transform', transform: 'translateZ(12px)' }}
            />
          ) : (
            <PokeBallPlaceholder />
          )}
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/30 px-4 py-3.5">
          <span
            className={cn(
              'rounded-md border px-2.5 py-[4px] text-[11px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
              rarity.border,
              rarity.bg,
              rarity.glow,
            )}
            style={{ color: accentColor }}
          >
            {rarityLabel(pokemon.rarity)}
          </span>
          {rarity.stars > 0 && <RarityStars count={rarity.stars} color={accentColor} />}
        </div>
      </div>
    </div>
  );
};
