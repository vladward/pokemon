import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  size?: 'sm' | 'lg' | 'xl';
  color?: 'red' | 'green' | 'yellow';
}

const SIZES = { sm: 18, lg: 36, xl: 52 } as const;
const COLORS = {
  red: 'bg-pokedex-hud-red',
  green: 'bg-pokedex-hud-green',
  yellow: 'bg-yellow',
} as const;

export function Lens({ size = 'sm', color = 'yellow', className }: Props) {
  const dim = SIZES[size];
  const bg = COLORS[color];
  return (
    /* Outer chrome bezel ring */
    <div
      className={cn('relative flex-none rounded-full', bg, className)}
      style={{
        width: dim,
        height: dim,
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
        padding: 2,
      }}
    >
      {/* Inner lens glass */}
      <div
        className={`h-full w-full rounded-full ${bg}`}
        style={{
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
        }}
      >
        {/* Specular highlight */}
        <div
          className="rounded-full"
          style={{
            position: 'absolute',
            width: 5,
            height: 5,
            top: 5,
            left: 7,
            background: 'rgba(255,255,255,0.60)',
            filter: 'blur(1px)',
          }}
        />
      </div>
    </div>
  );
}
