export function PokedexGlass() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[9]"
      style={{
        borderRadius: 'var(--pdx-r-screen)',
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 38%, transparent 62%, rgba(255,255,255,0.06) 100%)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
