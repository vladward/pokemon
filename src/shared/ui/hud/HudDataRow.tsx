import { cn } from '@/shared/lib/utils';

interface Props {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function HudDataRow({ label, value, className }: Props) {
  return (
    <div className={cn('flex items-baseline justify-between gap-2', className)}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
        {label}
      </span>
      <span className="font-mono text-[12px] tabular-nums text-pokedex-hud-ink">{value}</span>
    </div>
  );
}
