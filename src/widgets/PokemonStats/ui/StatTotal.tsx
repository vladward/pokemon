interface Props {
  total: number;
  label?: string;
}

export function StatTotal({ total, label = 'Total' }: Props) {
  return (
    <div
      className="mt-1 flex items-baseline justify-between border-t pt-2"
      style={{ borderColor: 'var(--pdx-hud-cyan-border-strong)' }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-cyan">
        {label}
      </span>
      <span
        className="font-mono text-[13px] font-bold tabular-nums text-pokedex-hud-cyan"
        style={{ textShadow: '0 0 8px var(--pdx-hud-cyan-glow)' }}
      >
        {total}
      </span>
    </div>
  );
}
