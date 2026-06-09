import { HudFrame } from '@/shared/ui/hud';

import type { TAbility } from '@/entities/Pokemon';

interface Props {
  ability: TAbility;
}

export function AbilityCard({ ability }: Props) {
  return (
    <HudFrame>
      <div className="flex flex-col gap-1 px-1">
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
