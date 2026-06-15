import type { TAbility } from '@/entities/Pokemon';

import { HudSection } from '@/shared/ui/hud';

import { AbilityCard } from './AbilityCard';

interface Props {
  abilities: TAbility[];
  label?: string;
  hiddenAbilityLabel?: string;
}

export function PokemonAbilitiesPanel({
  abilities,
  label = 'ABILITIES',
  hiddenAbilityLabel,
}: Props) {
  const regular = abilities.filter((a) => !a.isHidden);
  const hidden = abilities.filter((a) => a.isHidden);

  return (
    <HudSection label={label}>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {regular.map((ability) => (
          <AbilityCard
            key={ability.id}
            ability={ability}
          />
        ))}
        {hidden.map((ability) => (
          <AbilityCard
            key={ability.id}
            ability={ability}
            variant="hidden"
            hiddenLabel={hiddenAbilityLabel}
          />
        ))}
      </div>
    </HudSection>
  );
}
