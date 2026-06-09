import { PokedexScrew } from './PokedexScrew';

export function PokedexHinge() {
  return (
    <div
      className="relative z-[4] flex flex-none flex-col items-center justify-between py-6"
      style={{
        width: 44,
        background:
          'linear-gradient(to right, var(--pdx-metal-900) 0%, var(--pdx-metal-500) 35%, var(--pdx-metal-100) 50%, var(--pdx-metal-500) 65%, var(--pdx-metal-900) 100%)',
        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6)',
      }}
    >
      <PokedexScrew />
      <PokedexScrew />
    </div>
  );
}
