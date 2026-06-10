import { cn } from '@/shared/lib/utils';

interface Props {
  items: string[];
  className?: string;
}

export function HudList({ items, className }: Props) {
  return (
    <ul className={cn('space-y-1', className)}>
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2 font-mono text-[12px] text-pokedex-hud-ink"
        >
          <span
            className="h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: 'var(--pdx-hud-cyan)' }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
