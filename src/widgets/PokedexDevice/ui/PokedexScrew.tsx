export function PokedexScrew() {
  return (
    <div
      className="relative h-4 w-4 rounded-full"
      style={{
        background:
          'radial-gradient(circle at 35% 35%, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 55%, var(--pdx-metal-900) 100%)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Phillips cross slot */}
      <svg
        className="absolute inset-0"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden
      >
        <line
          x1="8"
          y1="3"
          x2="8"
          y2="13"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="8"
          x2="13"
          y2="8"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="3"
          x2="8"
          y2="13"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="8"
          x2="13"
          y2="8"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
