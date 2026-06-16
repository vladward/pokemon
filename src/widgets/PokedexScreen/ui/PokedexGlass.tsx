export function PokedexGlass() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[9]"
      style={{
        borderRadius: 'var(--pdx-r-screen)',
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.08) 22%, transparent 42%, transparent 62%, rgba(255,255,255,0.08) 100%)',
        mixBlendMode: 'screen',
      }}
    />
  );
}
