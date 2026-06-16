import { HudList, HudSection } from '@/shared/ui/hud';

interface Props {
  locations: string[];
  label?: string;
}

export function PokemonRegionsPanel({ locations, label = 'LOCATION' }: Props) {
  if (locations.length === 0) return null;

  return (
    <HudSection label={label}>
      <HudList items={locations} />
    </HudSection>
  );
}
