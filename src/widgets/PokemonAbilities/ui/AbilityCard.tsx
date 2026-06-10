import type { TAbility } from '@/entities/Pokemon';

interface Props {
  ability: TAbility;
}

export function AbilityCard({ ability }: Props) {
  return (
    <div
      className="flex flex-col gap-1 border-l-2 pl-2 pr-1"
      style={{
        borderColor: 'var(--pdx-hud-cyan)',
        boxShadow: '-3px 0 8px var(--pdx-hud-cyan-glow)',
      }}
    >
      <span className="font-mono text-[12px] font-medium capitalize text-pokedex-hud-ink">
        {ability.name}
      </span>
      {ability.shortEffect && (
        <p className="font-mono text-[10px] leading-relaxed text-pokedex-hud-ink-dim">
          {ability.shortEffect}
        </p>
      )}
    </div>
  );
}
