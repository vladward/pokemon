import { StatBar } from './StatBar';

interface Props {
  label: string;
  value: number;
}

function getValueColor(value: number): string {
  if (value >= 150) return 'var(--pdx-hud-green)';
  if (value < 60) return 'var(--pdx-hud-red)';
  return 'var(--pdx-hud-ink)';
}

export function StatRow({ label, value }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
          {label}
        </span>
        <span
          className="font-mono text-[12px] tabular-nums"
          style={{ color: getValueColor(value) }}
        >
          {value}
        </span>
      </div>
      <StatBar value={value} />
    </div>
  );
}
