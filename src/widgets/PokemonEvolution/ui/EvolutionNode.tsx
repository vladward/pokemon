import { cn } from '@/shared/lib/utils';

import type { TEvolutionNode } from '@/entities/Pokemon';

interface Props {
  node: TEvolutionNode;
}

export function EvolutionNode({ node }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 rounded px-2 py-1.5',
        node.isCurrent && 'bg-[rgba(93,217,216,0.08)]',
      )}
      style={
        node.isCurrent
          ? {
              boxShadow: '0 0 0 1px var(--pdx-hud-cyan), 0 0 8px var(--pdx-hud-cyan-glow)',
              borderRadius: 'var(--pdx-r-hud)',
            }
          : undefined
      }
    >
      <div className="relative h-36 w-36 flex-none">
        {node.sprite ? (
          <img
            src={node.sprite}
            alt={node.name}
            width={144}
            height={144}
            className={cn('h-full w-full object-contain', !node.isCurrent && 'opacity-55')}
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <div
            className="h-full w-full rounded-full opacity-20"
            style={{ background: 'var(--pdx-hud-cyan)' }}
          />
        )}
      </div>
      <span
        className={cn(
          'w-36 truncate text-center font-mono text-[9px] capitalize leading-tight',
          node.isCurrent ? 'text-pokedex-hud-ink' : 'text-pokedex-hud-ink-dim',
        )}
      >
        {node.name}
      </span>
    </div>
  );
}
