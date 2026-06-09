import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export function Lens({ className }: Props) {
  return (
    /* Outer chrome bezel ring */
    <div
      className={cn('relative flex-none rounded-full', className)}
      style={{
        width: 28,
        height: 28,
        background:
          'linear-gradient(135deg, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 50%, var(--pdx-metal-900) 100%)',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
        padding: 2,
      }}
    >
      {/* Inner lens glass */}
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(80,80,90,1) 0%, rgba(10,10,14,1) 60%, #000 100%)',
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
