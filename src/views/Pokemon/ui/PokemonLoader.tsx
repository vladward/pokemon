export const PokemonLoader = () => (
  <div className="flex flex-col items-center py-24">
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 100 100"
        className="h-20 w-20 animate-pokeball-bounce drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
        aria-hidden="true"
      >
        <path
          d="M5,50 A45,45 0 0,1 95,50 Z"
          fill="#e63946"
        />
        <path
          d="M5,50 A45,45 0 0,0 95,50 Z"
          fill="#f8f8f8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1a1a2e"
          strokeWidth="5"
        />
        <rect
          x="5"
          y="44"
          width="90"
          height="12"
          fill="#1a1a2e"
        />
        <circle
          cx="50"
          cy="50"
          r="12"
          fill="#1a1a2e"
        />
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="#f8f8f8"
        />
        <circle
          cx="44"
          cy="43"
          r="3"
          fill="rgba(255,255,255,0.55)"
        />
      </svg>

      <div className="mt-2 h-[6px] w-14 rounded-full bg-black/30 blur-[3px] animate-pokeball-shadow" />
    </div>
  </div>
);
