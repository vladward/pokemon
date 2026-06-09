import { StatBar } from './StatBar';

interface Props {
  label: string;
  value: number;
}

export function StatRow({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
          {label}
        </span>
        <span className="font-mono text-[12px] tabular-nums text-pokedex-hud-ink">{value}</span>
      </div>
      <StatBar value={value} />
    </div>
  );
}
