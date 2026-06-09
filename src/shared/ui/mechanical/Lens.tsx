import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export function Lens({ className }: Props) {
  return (
    <div
      className={cn('relative flex-none rounded-full', className)}
      style={{
        width: 28,
        height: 28,
        background:
          'radial-gradient(circle at 35% 35%, rgba(80,80,90,1) 0%, rgba(10,10,14,1) 60%, #000 100%)',
        boxShadow: '0 0 0 2px rgba(255,255,255,0.12), inset 0 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      <div
        className="rounded-full"
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          top: 5,
          left: 7,
          background: 'rgba(255,255,255,0.55)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}
