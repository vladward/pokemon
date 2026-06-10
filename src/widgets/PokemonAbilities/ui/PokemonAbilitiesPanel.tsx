import type { TAbility } from '@/entities/Pokemon';

import { HudSection } from '@/shared/ui/hud';

import { AbilityCard } from './AbilityCard';
import { HiddenAbilityCard } from './HiddenAbilityCard';

interface Props {
  abilities: TAbility[];
  label?: string;
}

export function PokemonAbilitiesPanel({ abilities, label = 'ABILITIES' }: Props) {
  const regular = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);

  return (
    <HudSection label={label}>
      <div className="flex flex-col gap-2 overscroll-y-auto">
        {regular.map((ability) => (
          <AbilityCard
            key={ability.id}
            ability={ability}
          />
        ))}
        {hidden.map((ability) => (
          <HiddenAbilityCard
            key={ability.id}
            ability={ability}
          />
        ))}
      </div>
    </HudSection>
  );
}
