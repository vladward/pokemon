interface Props {
  total: number;
}

export function StatTotal({ total }: Props) {
  return (
    <div
      className="mt-1 flex items-baseline justify-between border-t pt-2"
      style={{ borderColor: 'rgba(93,217,216,0.2)' }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-cyan">
        Total
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
