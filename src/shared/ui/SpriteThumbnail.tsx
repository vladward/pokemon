import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

interface Props {
  pokemonId: number;
  sprite: string | null;
  name: string;
  isCurrent: boolean;
  size?: 'sm' | 'lg';
  className?: string;
}

const SIZE = {
  sm: { container: 'h-[120px] w-[120px]', imgPx: 120, text: 'w-[120px] text-[8px]', padding: 'p-1.5', glow: '6px' },
  lg: { container: 'h-36 w-36',           imgPx: 144, text: 'w-36 text-[9px]',      padding: 'px-2 py-1.5', glow: '8px' },
} as const;

export function SpriteThumbnail({ pokemonId, sprite, name, isCurrent, size = 'sm', className }: Props) {
  const { container, imgPx, text, padding, glow } = SIZE[size];

  return (
    <Link
      href={`/pokemon/${pokemonId}`}
      data-current={isCurrent ? 'true' : undefined}
      className={cn(
        'flex flex-col items-center gap-1 rounded transition-colors',
        padding,
        'hover:bg-[var(--pdx-hud-cyan-surface-hover)]',
        isCurrent && 'bg-[var(--pdx-hud-cyan-active)]',
        className,
      )}
      style={isCurrent ? {
        boxShadow: `0 0 0 1px var(--pdx-hud-cyan), 0 0 ${glow} var(--pdx-hud-cyan-glow)`,
        borderRadius: 'var(--pdx-r-hud)',
      } : undefined}
    >
      <div className={cn('relative flex-none', container)}>
        {sprite ? (
          <Image
            src={sprite}
            alt={name}
            width={imgPx}
            height={imgPx}
            className={cn('h-full w-full object-contain', !isCurrent && 'opacity-55')}
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <div
            className="h-full w-full rounded-full opacity-20"
            style={{ background: 'var(--pdx-hud-cyan)' }}
          />
        )}
      </div>
      <span className={cn(
        'truncate text-center font-mono capitalize leading-tight',
        text,
        isCurrent ? 'text-pokedex-hud-ink' : 'text-pokedex-hud-ink-dim',
      )}>
        {name}
      </span>
    </Link>
  );
}
