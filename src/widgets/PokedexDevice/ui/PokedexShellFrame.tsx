export function PokedexShellFrame() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[12]"
      style={{
        borderRadius: 'var(--pdx-r-shell)',
        boxShadow:
          'inset 0 0 0 2px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    />
  );
}
