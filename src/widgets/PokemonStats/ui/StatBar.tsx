const TOTAL_SEGMENTS = 20;

interface Props {
  value: number;
  max?: number;
}

export function StatBar({ value, max = 255 }: Props) {
  const filled = Math.round((value / max) * TOTAL_SEGMENTS);

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
        const isFilled = i < filled;
        return (
          <div
            key={i}
            className={isFilled ? 'h-2 flex-1 rounded-sm motion-safe:animate-pdx-stat-fill' : 'h-2 flex-1 rounded-sm'}
            style={
              isFilled
                ? {
                    background: 'linear-gradient(to top, var(--pdx-hud-cyan), var(--pdx-led-cyan-core))',
                    boxShadow: '0 0 4px var(--pdx-hud-cyan-glow)',
                    animationDelay: `${i * 30}ms`,
                    transformOrigin: 'left center',
                  }
                : {
                    background: 'rgba(93,217,216,0.08)',
                  }
            }
          />
        );
      })}
    </div>
  );
}
