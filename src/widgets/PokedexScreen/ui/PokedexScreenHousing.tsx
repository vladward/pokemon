import { cn } from '@/shared/lib/utils';

import { PokedexScreenSurface } from './PokedexScreenSurface';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function PokedexScreenHousing({ children, className }: Props) {
  return (
    <div
      className={cn('relative p-[10px]', className)}
      style={{
        borderRadius: 'var(--pdx-r-inner)',
        background:
          'linear-gradient(145deg, var(--pdx-metal-500) 0%, var(--pdx-metal-900) 100%)',
        boxShadow:
          'inset 0 3px 8px rgba(0,0,0,0.85), inset 0 -1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <PokedexScreenSurface>{children}</PokedexScreenSurface>
    </div>
  );
}
