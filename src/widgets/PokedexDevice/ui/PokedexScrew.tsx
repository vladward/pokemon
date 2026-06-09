export function PokedexScrew() {
  return (
    <div
      className="h-4 w-4 rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 35%, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 55%, var(--pdx-metal-900) 100%)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.08)',
      }}
    />
  );
}
