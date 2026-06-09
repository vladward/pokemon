import { HudSection } from '@/shared/ui/hud';

import type { TAbility } from '@/entities/Pokemon';

import { AbilityCard } from './AbilityCard';
import { HiddenAbilityCard } from './HiddenAbilityCard';

interface Props {
  abilities: TAbility[];
}

export function PokemonAbilitiesPanel({ abilities }: Props) {
  const regular = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);

  return (
    <HudSection label="Abilities">
      <div className="flex flex-col gap-2">
        {regular.map((ability) => (
          <AbilityCard key={ability.id} ability={ability} />
        ))}
        {hidden.map((ability) => (
          <HiddenAbilityCard key={ability.id} ability={ability} />
        ))}
      </div>
    </HudSection>
  );
}
