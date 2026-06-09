interface Props {
  type: string;
}

export function PokemonTypeBadge({ type }: Props) {
  return (
    <span
      className="rounded-full px-3 py-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white"
      style={{
        background: `var(--type-${type})`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.30), 0 0 8px color-mix(in srgb, var(--type-${type}) 60%, transparent)`,
      }}
    >
      {type}
    </span>
  );
}
