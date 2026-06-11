import type { TAbility } from '@/entities/Pokemon';

interface Props {
  ability: TAbility;
  variant?: 'normal' | 'hidden';
  hiddenLabel?: string;
}

const VARIANT_COLORS = {
  normal: { border: 'var(--pdx-hud-cyan)',  glow: 'var(--pdx-hud-cyan-glow)'  },
  hidden: { border: 'var(--pdx-hud-amber)', glow: 'var(--pdx-hud-amber-glow)' },
};

export function AbilityCard({ ability, variant = 'normal', hiddenLabel = 'Hidden Ability' }: Props) {
  const { border, glow } = VARIANT_COLORS[variant];

  return (
    <div
      className="flex flex-col gap-1 border-l-2 pl-2 pr-1"
      style={{ borderColor: border, boxShadow: `-3px 0 8px ${glow}` }}
    >
      {variant === 'hidden' && (
        <span
          className="font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: border }}
        >
          {hiddenLabel}
        </span>
      )}
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
