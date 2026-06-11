import { HudDataRow, HudSection } from '@/shared/ui/hud';

import type { TBiology } from '@/entities/Pokemon';

interface BiologyLabels {
  species: string;
  height: string;
  weight: string;
  eggGroups: string;
  catchRate: string;
  baseFriendship: string;
  hatchCounter: string;
  shape: string;
  color: string;
  habitat: string;
  unitM: string;
  unitKg: string;
  steps: string;
}

interface Props {
  biology: TBiology;
  labels: BiologyLabels;
  shapeValue: string | null;
  colorValue: string | null;
  habitatValue: string | null;
  label?: string;
}

export function PokemonBiologyPanel({ biology, labels, shapeValue, colorValue, habitatValue, label = 'BIOLOGICAL INFO' }: Props) {
  const heightM = `${(biology.height / 10).toFixed(1)} ${labels.unitM}`;
  const weightKg = `${(biology.weight / 10).toFixed(1)} ${labels.unitKg}`;
  const hatchSteps = biology.hatchCounter !== null
    ? `${(biology.hatchCounter + 1) * 255} ${labels.steps}`
    : null;

  const rows: { label: string; value: React.ReactNode }[] = [
    biology.genus ? { label: labels.species, value: biology.genus } : null,
    { label: labels.height, value: heightM },
    { label: labels.weight, value: weightKg },
    biology.eggGroups.length > 0
      ? { label: labels.eggGroups, value: biology.eggGroups.join(', ') }
      : null,
    biology.catchRate !== null
      ? { label: labels.catchRate, value: biology.catchRate }
      : null,
    biology.baseHappiness !== null
      ? { label: labels.baseFriendship, value: biology.baseHappiness }
      : null,
    hatchSteps !== null
      ? { label: labels.hatchCounter, value: hatchSteps }
      : null,
    shapeValue !== null
      ? { label: labels.shape, value: shapeValue }
      : null,
    colorValue !== null
      ? { label: labels.color, value: colorValue }
      : null,
    habitatValue !== null
      ? { label: labels.habitat, value: habitatValue }
      : null,
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <HudSection label={label}>
      <div className="flex flex-col gap-1.5">
        {rows.map((row) => (
          <HudDataRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </HudSection>
  );
}
