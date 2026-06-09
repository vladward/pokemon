export function PokedexContactShadow() {
  return (
    <div
      className="pointer-events-none absolute -bottom-8 left-1/2 h-10 w-[90%] -translate-x-1/2"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.65) 0%, transparent 72%)',
        filter: 'blur(8px)',
      }}
    />
  );
}
