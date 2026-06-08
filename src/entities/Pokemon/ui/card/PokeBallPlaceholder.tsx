export const PokeBallPlaceholder = () => (
  <div className="flex h-[160px] w-[160px] items-center justify-center">
    <svg
      viewBox="0 0 100 100"
      className="h-[110px] w-[110px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
    >
      <path
        d="M4,50 A46,46 0 0,0 96,50 Z"
        fill="rgba(220,38,38,0.72)"
      />
      <path
        d="M4,50 A46,46 0 0,1 96,50 Z"
        fill="rgba(255,255,255,0.72)"
      />
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="rgba(15,15,15,0.4)"
        strokeWidth="4"
      />
      <rect
        x="4"
        y="44"
        width="92"
        height="12"
        fill="rgba(15,15,15,0.3)"
      />
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="rgba(15,15,15,0.35)"
      />
      <circle
        cx="50"
        cy="50"
        r="9"
        fill="rgba(255,255,255,0.9)"
      />
      <circle
        cx="46"
        cy="46"
        r="3"
        fill="rgba(255,255,255,0.55)"
      />
    </svg>
  </div>
);
