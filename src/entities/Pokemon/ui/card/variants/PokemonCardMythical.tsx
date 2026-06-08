import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';

import { cn } from '@/shared/lib/utils/cn';

import type { PokemonRarity } from '../../../config';
import type { PokemonCard as PokemonCardType } from '../../../PokemonCard';
import { rarityConfig, typeBadgeColors, getGradientClasses } from '../config';
import { PokeBallPlaceholder } from '../PokeBallPlaceholder';
import { RarityStars } from '../RarityStars';
import { TiltWrapper } from '../TiltWrapper';

interface Props {
  pokemon: PokemonCardType;
}

const MYTHICAL_STARS: Array<{ pos: CSSProperties; delay: string; size: string }> = [
  { pos: { top: '12%', left: '9%' }, delay: '0s', size: 'h-[3px] w-[3px]' },
  { pos: { top: '19%', right: '8%' }, delay: '0.8s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '30%', left: '5%' }, delay: '1.9s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '44%', right: '7%' }, delay: '0.4s', size: 'h-[3px] w-[3px]' },
  { pos: { top: '57%', left: '11%' }, delay: '2.5s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '70%', right: '12%' }, delay: '1.3s', size: 'h-[2px] w-[2px]' },
  { pos: { bottom: '15%', left: '28%' }, delay: '3.0s', size: 'h-[2px] w-[2px]' },
  { pos: { top: '25%', left: '40%' }, delay: '1.6s', size: 'h-[2px] w-[2px]' },
];

export const PokemonCardMythical = async ({ pokemon }: Props) => {
  const image = pokemon.spriteDreamWorld ?? pokemon.spriteArtwork ?? pokemon.sprite;
  const gradient = getGradientClasses(pokemon.types);
  const rarity = rarityConfig[pokemon.rarity];
  const tCard = await getTranslations('pokemon_card');
  const tTypes = await getTranslations('elements');

  const rarityLabel = (r: PokemonRarity) => tCard(`rarity.${r}` as `rarity.${PokemonRarity}`);
  const stageLabel = (s: NonNullable<PokemonCardType['evolutionStage']>) =>
    tCard(
      `evolution_stage.${s}` as `evolution_stage.${NonNullable<PokemonCardType['evolutionStage']>}`,
    );
  const typeLabel = (type: string) => tTypes(type as Parameters<typeof tTypes>[0]);

  return (
    <TiltWrapper
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

        <div className="relative z-10 flex items-start justify-between px-4 pt-4">
          <span className="font-mono text-[13px] font-semibold tracking-widest text-white/50">
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
                    tc.text,
                  )}
                >
                  {typeLabel(type)}
                </span>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 px-4 pt-1">
          <h3 className="text-l font-bold capitalize leading-tight tracking-wide text-white line-clamp-2 overflow-hidden text-ellipsis drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {pokemon.name}
          </h3>
          {pokemon.evolutionStage && (
            <span className="text-[11px] font-semibold tracking-widest text-white/50 uppercase">
              {stageLabel(pokemon.evolutionStage)}
            </span>
          )}
        </div>

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

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-4 pt-[10px] pb-[14px]">
          <span
            className={cn(
              'rounded-md border px-2.5 pt-[7px] pb-[5px] text-[11px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
              rarity.border,
              rarity.bg,
              rarity.glow,
            )}
            style={{ color: rarity.color }}
          >
            {rarityLabel(pokemon.rarity)}
          </span>
          {rarity.stars > 0 && (
            <RarityStars
              count={rarity.stars}
              color={rarity.color}
            />
          )}
        </div>
      </div>
    </TiltWrapper>
  );
};
