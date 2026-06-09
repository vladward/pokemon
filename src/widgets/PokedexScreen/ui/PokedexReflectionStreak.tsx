export function PokedexReflectionStreak() {
  return (
    <div
      className="pdx-reflection-streak pointer-events-none absolute inset-0 z-[10] overflow-hidden"
      style={{ borderRadius: 'var(--pdx-r-screen)' }}
    >
      <div
        className="absolute inset-y-[-20%] w-full motion-safe:animate-pdx-streak"
        style={{
          background:
            'linear-gradient(to right, transparent 38%, var(--pdx-glass-streak) 49%, var(--pdx-glass-streak) 51%, transparent 62%)',
        }}
      />
    </div>
  );
}
