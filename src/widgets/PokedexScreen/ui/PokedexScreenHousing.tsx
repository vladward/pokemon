import { cn } from '@/shared/lib/utils';

import { PokedexScreenSurface } from './PokedexScreenSurface';

interface Props {
  children?: React.ReactNode;
  className?: string;
  stretch?: boolean;
}

export function PokedexScreenHousing({ children, className, stretch }: Props) {
  return (
    <div
      className={cn('relative p-[10px]', stretch && 'flex flex-col', className)}
      style={{
        borderRadius: 'var(--pdx-r-inner)',
        background: 'linear-gradient(145deg, var(--pdx-metal-500) 0%, var(--pdx-metal-900) 100%)',
        boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.85), inset 0 -1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <PokedexScreenSurface stretch={stretch}>{children}</PokedexScreenSurface>
    </div>
  );
}
