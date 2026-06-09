import type React from 'react';

interface Props {
  text: string | null;
  label?: string;
}

export function PokedexEntry({ text, label = 'POKÉDEX ENTRY' }: Props) {
  if (!text) return null;

  const duration = (text.length / 25).toFixed(1);

  return (
    <div className="relative">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
        {label}
      </span>
      <div
        className="relative overflow-hidden rounded px-2 py-1.5"
        style={{
          background: 'rgba(93,217,216,0.03)',
          border: '1px solid rgba(93,217,216,0.10)',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        <p
          className="pdx-typewriter font-mono text-[11px] leading-relaxed text-pokedex-hud-ink overflow-hidden"
          style={{ '--pdx-tw-duration': `${duration}s` } as React.CSSProperties}
        >
          {text}
        </p>
        <span
          className="pointer-events-none absolute bottom-0 right-0 font-mono text-[11px] leading-relaxed motion-safe:animate-pdx-caret motion-reduce:hidden text-pokedex-hud-cyan"
          style={{ opacity: 0, animationDelay: `${duration}s` }}
          aria-hidden
        >
          ▋
        </span>
      </div>
    </div>
  );
}
