interface Props {
  text: string | null;
}

export function PokedexEntry({ text }: Props) {
  if (!text) return null;

  const chars = text.length;
  const steps = Math.min(chars, 80);
  const duration = (chars / 25).toFixed(1);

  return (
    <div className="relative">
      <span
        className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim"
      >
        Pokédex Entry
      </span>
      <div className="relative overflow-hidden">
        <p
          className="pdx-typewriter font-mono text-[11px] leading-relaxed text-pokedex-hud-ink overflow-hidden"
          style={{
            animation: `pdxTypewriter ${duration}s steps(${steps}) forwards`,
          }}
        >
          {text}
        </p>
        <span
          className="pointer-events-none absolute bottom-0 right-0 font-mono text-[11px] leading-relaxed motion-safe:animate-pdx-caret motion-reduce:hidden text-pokedex-hud-cyan"
          aria-hidden
        >
          ▋
        </span>
      </div>
    </div>
  );
}
