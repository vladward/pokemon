export function HudScanline() {
  return (
    <div
      className="pdx-scanline-sweep pointer-events-none absolute inset-0 z-[1] motion-safe:animate-pdx-scanline-sweep"
      style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          var(--pdx-scanline) 0px,
          var(--pdx-scanline) 1px,
          transparent 1px,
          transparent 3px
        )`,
      }}
    />
  );
}
