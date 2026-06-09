import { HudList, HudSection } from '@/shared/ui/hud';

interface Props {
  locations: string[];
}

export function PokemonRegionsPanel({ locations }: Props) {
  if (locations.length === 0) return null;

  return (
    <HudSection label="Location">
      <HudList items={locations} />
    </HudSection>
  );
}
