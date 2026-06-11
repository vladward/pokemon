interface Props {
  height: number;
  weight: number;
  heightLabel?: string;
  weightLabel?: string;
  unitM?: string;
  unitKg?: string;
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-0.5 rounded px-2 py-1"
      style={{
        background: 'var(--pdx-hud-cyan-surface)',
        border: '1px solid var(--pdx-hud-cyan-border)',
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
        {label}
      </span>
      <span className="font-mono text-[13px] tabular-nums text-pokedex-hud-ink">
        {value}
      </span>
    </div>
  );
}

export function MetricGrid({
  height,
  weight,
  heightLabel = 'Height',
  weightLabel = 'Weight',
  unitM = 'm',
  unitKg = 'kg',
}: Props) {
  return (
    <div className="flex gap-2">
      <MetricCell label={heightLabel} value={`${(height / 10).toFixed(1)} ${unitM}`} />
      <MetricCell label={weightLabel} value={`${(weight / 10).toFixed(1)} ${unitKg}`} />
    </div>
  );
}
