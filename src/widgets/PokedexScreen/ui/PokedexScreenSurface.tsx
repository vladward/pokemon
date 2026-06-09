import { HudGrid } from '@/shared/ui/hud/HudGrid';
import { HudScanline } from '@/shared/ui/hud/HudScanline';

import { PokedexGlass } from './PokedexGlass';
import { PokedexReflectionStreak } from './PokedexReflectionStreak';

interface Props {
  children?: React.ReactNode;
}

export function PokedexScreenSurface({ children }: Props) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: 'var(--pdx-r-screen)',
        backgroundColor: 'var(--pdx-screen-bg-0)',
        boxShadow: 'var(--pdx-sh-screen-inset)',
      }}
    >
      <HudGrid />
      <HudScanline />
      <div className="relative z-[6] h-full w-full">{children}</div>
      <PokedexGlass />
      <PokedexReflectionStreak />
    </div>
  );
}
