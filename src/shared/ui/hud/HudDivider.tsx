import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
}

export function HudDivider({ className }: Props) {
  return (
    <div
      className={cn('my-2 h-px w-full opacity-30', className)}
      style={{
        background: 'linear-gradient(to right, transparent, var(--pdx-hud-ink-dim), transparent)',
      }}
    />
  );
}
