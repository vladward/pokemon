interface Props {
  text: string | null;
  label?: string;
}

const CHAR_DELAY_MS = 28;

export function PokedexEntry({ text, label = 'POKÉDEX ENTRY' }: Props) {
  if (!text) return null;

  return (
    <div className="relative">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
        {label}
      </span>
      <div
        className="relative rounded px-2 py-1.5"
        style={{
          background: 'var(--pdx-hud-cyan-surface-dim)',
          border: '1px solid var(--pdx-hud-cyan-border-dim)',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        <p className="font-mono text-[11px] leading-relaxed text-pokedex-hud-ink">
          {text.split('').map((char, i) => (
            <span
              key={`${i}-${char}`}
              className="pdx-char"
              style={{ animationDelay: `${i * CHAR_DELAY_MS}ms` }}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
