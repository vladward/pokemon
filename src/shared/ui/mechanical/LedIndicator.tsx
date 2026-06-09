import { cn } from '@/shared/lib/utils';

interface Props {
  size?: 'sm' | 'lg';
  className?: string;
}

const SIZES = { sm: 26, lg: 36 } as const;

export function LedIndicator({ size = 'sm', className }: Props) {
  const dim = SIZES[size];

  return (
    <div
      className={cn('pdx-led-breathe rounded-full motion-safe:animate-pdx-led-breathe', className)}
      style={{
        width: dim,
        height: dim,
        background: `radial-gradient(circle at 38% 38%,
          var(--pdx-led-cyan-core) 0%,
          var(--pdx-led-cyan) 40%,
          rgba(93,217,216,0.4) 70%,
          transparent 100%)`,
        boxShadow: 'var(--pdx-sh-led-glow)',
      }}
    />
  );
}
