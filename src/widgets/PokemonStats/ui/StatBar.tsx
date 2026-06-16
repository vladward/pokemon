const TOTAL_SEGMENTS = 20;

interface Props {
  value: number;
  max?: number;
}

function getBarStyle(value: number): { fill: string; glow: string } {
  if (value >= 150)
    return {
      fill: 'linear-gradient(to top, var(--pdx-hud-green), #b6ffc0)',
      glow: '0 0 4px rgba(107,230,117,0.50)',
    };
  if (value >= 100)
    return {
      fill: 'linear-gradient(to top, var(--pdx-hud-cyan), var(--pdx-led-cyan-core))',
      glow: '0 0 4px var(--pdx-hud-cyan-glow)',
    };
  if (value >= 60)
    return {
      fill: 'linear-gradient(to top, var(--pdx-hud-amber), #ffd580)',
      glow: '0 0 4px rgba(244,169,59,0.45)',
    };
  return {
    fill: 'linear-gradient(to top, var(--pdx-hud-red), #ff8585)',
    glow: '0 0 4px rgba(255,82,82,0.45)',
  };
}

export function StatBar({ value, max = 255 }: Props) {
  const filled = Math.round((value / max) * TOTAL_SEGMENTS);
  const { fill, glow } = getBarStyle(value);

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
        const isFilled = i < filled;
        return (
          <div
            key={i}
            className={
              isFilled
                ? 'h-2 flex-1 rounded-sm motion-safe:animate-pdx-stat-fill'
                : 'h-2 flex-1 rounded-sm'
            }
            style={
              isFilled
                ? {
                    background: fill,
                    boxShadow: glow,
                    animationDelay: `${i * 30}ms`,
                    transformOrigin: 'left center',
                  }
                : {
                    background: 'var(--pdx-hud-cyan-active)',
                  }
            }
          />
        );
      })}
    </div>
  );
}
