import { HudDataRow, HudSection } from '@/shared/ui/hud';

import type { TBiology } from '@/entities/Pokemon';

interface Props {
  biology: TBiology;
}

export function PokemonBiologyPanel({ biology }: Props) {
  const heightM = (biology.height / 10).toFixed(1);
  const weightKg = (biology.weight / 10).toFixed(1);

  const rows: { label: string; value: React.ReactNode }[] = [
    biology.genus ? { label: 'Species', value: biology.genus } : null,
    { label: 'Height', value: `${heightM} m` },
    { label: 'Weight', value: `${weightKg} kg` },
    biology.eggGroups.length > 0
      ? { label: 'Egg Groups', value: biology.eggGroups.join(', ') }
      : null,
    biology.catchRate !== null ? { label: 'Catch Rate', value: biology.catchRate } : null,
    biology.baseHappiness !== null
      ? { label: 'Base Friendship', value: biology.baseHappiness }
      : null,
    biology.hatchCounter !== null
      ? {
          label: 'Hatch Counter',
          value: `${(biology.hatchCounter + 1) * 255} steps`,
        }
      : null,
    biology.shape ? { label: 'Shape', value: biology.shape } : null,
    biology.color ? { label: 'Color', value: biology.color } : null,
    biology.habitat ? { label: 'Habitat', value: biology.habitat } : null,
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <HudSection label="Biological Info">
      <div className="flex flex-col gap-1.5">
        {rows.map((row) => (
          <HudDataRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </HudSection>
  );
}
