import type { TPokemonDetails } from '@/entities/Pokemon';

import { MetricGrid } from './MetricGrid';
import { PokedexEntry } from './PokedexEntry';
import { PokemonTypeBadge } from './PokemonTypeBadge';
import { SpriteStage } from './SpriteStage';

interface Props {
  pokemon: TPokemonDetails;
}

export function PokemonHeroDisplay({ pokemon }: Props) {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] tracking-[0.18em] text-pokedex-hud-ink-dim">
          No. {String(pokemon.id).padStart(3, '0')}
        </span>
        <h1
          className="font-mono text-2xl font-bold uppercase leading-none tracking-[0.08em] text-pokedex-hud-ink"
          style={{ textShadow: '0 0 12px var(--pdx-hud-cyan-glow)' }}
        >
          {pokemon.name}
        </h1>
        {pokemon.biology.genus && (
          <span className="font-mono text-[11px] text-pokedex-hud-ink-dim">
            {pokemon.biology.genus}
          </span>
        )}
        <div className="mt-1 flex gap-2">
          {pokemon.types.map((type) => (
            <PokemonTypeBadge key={type} type={type} />
          ))}
        </div>
      </div>

      {/* Sprite */}
      <SpriteStage
        sprite={pokemon.sprite}
        spriteArtwork={pokemon.spriteArtwork}
        name={pokemon.name}
      />

      {/* Metrics + Entry */}
      <div className="flex flex-col gap-3">
        <MetricGrid height={pokemon.biology.height} weight={pokemon.biology.weight} />
        <div
          className="h-px opacity-20"
          style={{ background: 'linear-gradient(to right, var(--pdx-hud-cyan), transparent)' }}
        />
        <PokedexEntry text={pokemon.flavorText} />
      </div>
    </div>
  );
}
