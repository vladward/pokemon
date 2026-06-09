import { HudSection } from '@/shared/ui/hud';

import type { TPokemonDetails } from '@/entities/Pokemon';

import { StatRow } from './StatRow';
import { StatTotal } from './StatTotal';

const STAT_LABELS: Record<keyof TPokemonDetails['stats'], string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Sp. Atk',
  specialDefense: 'Sp. Def',
  speed: 'Speed',
};

interface Props {
  stats: TPokemonDetails['stats'];
  label?: string;
}

export function PokemonStatsPanel({ stats, label = 'STATUS' }: Props) {
  const total = Object.values(stats).reduce((sum, v) => sum + v, 0);

  return (
    <HudSection label={label}>
      <div className="flex flex-col gap-2">
        {(Object.entries(stats) as [keyof typeof stats, number][]).map(([key, value]) => (
          <StatRow key={key} label={STAT_LABELS[key]} value={value} />
        ))}
        <StatTotal total={total} />
      </div>
    </HudSection>
  );
}
