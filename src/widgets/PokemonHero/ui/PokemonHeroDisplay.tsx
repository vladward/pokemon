import type { TPokemonDetails } from '@/entities/Pokemon';

import { MetricGrid } from './MetricGrid';
import { PokedexEntry } from './PokedexEntry';
import { PokemonTypeBadge } from './PokemonTypeBadge';
import { SpriteStage } from './SpriteStage';

interface Props {
  pokemon: TPokemonDetails;
  entryLabel?: string;
  heightLabel?: string;
  weightLabel?: string;
  unitM?: string;
  unitKg?: string;
}

export function PokemonHeroDisplay({
  pokemon,
  entryLabel,
  heightLabel,
  weightLabel,
  unitM,
  unitKg,
}: Props) {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[11px] tracking-[0.18em] text-pokedex-hud-ink-dim">
          No. {String(pokemon.id).padStart(3, '0')}
        </span>
        <h1
          className="font-orbitron font-bold uppercase leading-none tracking-[0.06em] text-pokedex-hud-ink"
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            textShadow: '0 0 16px var(--pdx-hud-cyan-glow)',
          }}
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
            <PokemonTypeBadge
              key={type}
              type={type}
            />
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
        <MetricGrid
          height={pokemon.biology.height}
          weight={pokemon.biology.weight}
          heightLabel={heightLabel}
          weightLabel={weightLabel}
          unitM={unitM}
          unitKg={unitKg}
        />
        <div
          className="h-px opacity-20"
          style={{ background: 'linear-gradient(to right, var(--pdx-hud-cyan), transparent)' }}
        />
        <PokedexEntry
          text={pokemon.flavorText}
          label={entryLabel}
        />
      </div>
    </div>
  );
}
