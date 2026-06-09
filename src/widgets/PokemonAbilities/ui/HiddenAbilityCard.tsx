import { HudFrame } from '@/shared/ui/hud';

import type { TAbility } from '@/entities/Pokemon';

interface Props {
  ability: TAbility;
}

export function HiddenAbilityCard({ ability }: Props) {
  return (
    <HudFrame>
      <div
        className="flex flex-col gap-1 border-l-2 pl-2 pr-1"
        style={{
          borderColor: 'var(--pdx-hud-amber)',
          boxShadow: '-3px 0 8px rgba(244,169,59,0.35)',
        }}
      >
        <span
          className="font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{ color: 'var(--pdx-hud-amber)' }}
        >
          Hidden Ability
        </span>
        <span className="font-mono text-[12px] font-medium capitalize text-pokedex-hud-ink">
          {ability.name}
        </span>
        {ability.shortEffect && (
          <p className="font-mono text-[10px] leading-relaxed text-pokedex-hud-ink-dim">
            {ability.shortEffect}
          </p>
        )}
      </div>
    </HudFrame>
  );
}
