function CornerScrew({ className }: { className: string }) {
  return (
    <div
      className={`absolute h-[10px] w-[10px] rounded-full ${className}`}
      style={{
        background:
          'radial-gradient(circle at 35% 35%, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 55%, var(--pdx-metal-900) 100%)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <svg
        className="absolute inset-0"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden
      >
        <line
          x1="5"
          y1="2"
          x2="5"
          y2="8"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line
          x1="2"
          y1="5"
          x2="8"
          y2="5"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function PokedexShellFrame() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[12]"
      style={{
        borderRadius: 'var(--pdx-r-shell)',
        boxShadow: 'inset 0 0 0 2px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      <CornerScrew className="left-3 top-3" />
      <CornerScrew className="right-3 top-3" />
      <CornerScrew className="bottom-3 left-3" />
      <CornerScrew className="bottom-3 right-3" />
    </div>
  );
}
