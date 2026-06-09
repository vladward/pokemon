import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/utils/cn';

import type { PokemonRarity } from '../../../config';
import type { TPokemonCard as PokemonCardType } from '../../../TPokemonCard';
import { rarityConfig, getGradientClasses } from '../config';
import { PokeBallPlaceholder } from '../PokeBallPlaceholder';
import { RarityStars } from '../RarityStars';
import { TiltWrapper } from '../TiltWrapper';

interface Props {
  pokemon: PokemonCardType;
  priority?: boolean;
}

export const PokemonCardLegendary = async ({ pokemon, priority }: Props) => {
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
        'group relative cursor-pointer rounded-[20px] w-[240px] h-[336px] mobile:w-full mobile:h-[200px]',
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

      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] mobile:justify-between">
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

        <div className="relative z-10 flex items-start justify-between px-4 pt-4 mobile:hidden">
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

        <div className="relative z-10 px-4 pt-1 mobile:px-3 mobile:pt-[10px] mobile:text-center">
          <h3 className="text-l font-black capitalize leading-tight tracking-wide text-white line-clamp-2 overflow-hidden text-ellipsis drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {pokemon.name}
          </h3>
          {pokemon.evolutionStage && (
            <span className="text-[11px] font-semibold tracking-widest text-white/50 uppercase mobile:hidden">
              {stageLabel(pokemon.evolutionStage)}
            </span>
          )}
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-2 mobile:flex-none mobile:py-0">
          <div
            className="pointer-events-none absolute inset-0 animate-corona-breathe motion-reduce:animate-none"
            style={{
              background:
                'radial-gradient(circle at 50% 58%, rgba(255,255,255,0.3), rgba(253,224,71,0.2) 40%, transparent 68%)',
            }}
          />
          {image ? (
            <Image
              src={image}
              alt={pokemon.name}
              width={160}
              height={160}
              priority={priority}
              className="h-[160px] w-[160px] mobile:h-[98px] mobile:w-[98px] select-none object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2"
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

        <div className="relative z-10 flex items-center justify-between border-t border-white/20 px-4 pt-[10px] pb-[14px] mobile:px-3 mobile:py-2">
          <span
            className={cn(
              'rounded-md border px-2.5 pt-[7px] pb-[5px] text-[11px] mobile:text-[9px] font-bold leading-none uppercase tracking-[0.15em] text-center backdrop-blur-sm',
              'border-white/30 bg-black/25 text-white',
              rarity.glow,
            )}
          >
            {rarityLabel(pokemon.rarity)}
          </span>
          <div className="mobile:hidden">
            {rarity.stars > 0 && (
              <RarityStars
                count={rarity.stars}
                color="rgba(255,255,255,0.8)"
              />
            )}
          </div>
        </div>
      </div>
    </TiltWrapper>
  );
};
