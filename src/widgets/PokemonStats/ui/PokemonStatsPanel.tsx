import type { TPokemonDetails } from '@/entities/Pokemon';

import { HudSection } from '@/shared/ui/hud';

import { StatRow } from './StatRow';
import { StatTotal } from './StatTotal';

interface Props {
  stats: TPokemonDetails['stats'];
  label?: string;
  statLabels: Record<keyof TPokemonDetails['stats'], string>;
  totalLabel: string;
}

export function PokemonStatsPanel({ stats, label = 'STATUS', statLabels, totalLabel }: Props) {
  const total = Object.values(stats).reduce((sum, v) => sum + v, 0);

  return (
    <HudSection label={label}>
      <div className="flex flex-col gap-2">
        {(Object.entries(stats) as [keyof typeof stats, number][]).map(([key, value]) => (
          <StatRow
            key={key}
            label={statLabels[key]}
            value={value}
          />
        ))}
        <StatTotal
          total={total}
          label={totalLabel}
        />
      </div>
    </HudSection>
  );
}
