import { PokedexReflectionStreak } from '@/widgets/PokedexScreen';

import { cn } from '@/shared/lib/utils';
import { HudGrid } from '@/shared/ui/hud/HudGrid';
import { HudScanline } from '@/shared/ui/hud/HudScanline';

import { PokedexGlass } from './PokedexGlass';

interface Props {
  children?: React.ReactNode;
  stretch?: boolean;
}

export function PokedexScreenSurface({ children, stretch }: Props) {
  return (
    <div
      className={cn(
        'relative min-h-full wide:h-full laptop:h-auto w-full overflow-hidden',
        stretch && 'flex flex-col flex-1',
      )}
      style={{
        borderRadius: 'var(--pdx-r-screen)',
        backgroundColor: 'var(--pdx-screen-bg-0)',
        boxShadow: 'var(--pdx-sh-screen-inset)',
      }}
    >
      <HudGrid />
      <HudScanline />
      <div className={cn('relative z-[6] w-full', stretch ? 'flex flex-col flex-1' : 'h-full')}>
        {children}
      </div>
      <PokedexGlass />
      <PokedexReflectionStreak />
    </div>
  );
}
