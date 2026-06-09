interface Props {
  height: number;
  weight: number;
}

export function MetricGrid({ height, weight }: Props) {
  const heightM = (height / 10).toFixed(1);
  const weightKg = (weight / 10).toFixed(1);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
          Height
        </span>
        <span className="font-mono text-[13px] tabular-nums text-pokedex-hud-ink">
          {heightM} m
        </span>
      </div>
      <div
        className="w-px opacity-30"
        style={{ background: 'var(--pdx-hud-ink-dim)' }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
          Weight
        </span>
        <span className="font-mono text-[13px] tabular-nums text-pokedex-hud-ink">
          {weightKg} kg
        </span>
      </div>
    </div>
  );
}
