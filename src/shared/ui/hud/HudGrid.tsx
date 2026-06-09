export function HudGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1]"
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--pdx-screen-grid) 1px, transparent 1px),
          linear-gradient(to bottom, var(--pdx-screen-grid) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
    />
  );
}
