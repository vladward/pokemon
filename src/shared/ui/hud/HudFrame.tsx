import { cn } from '@/shared/lib/utils';

function Corner({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={cn('absolute', className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M0 12 L0 0 L12 0"
        stroke="var(--pdx-hud-cyan)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export function HudFrame({ children, className }: Props) {
  return (
    <div className={cn('relative p-2', className)}>
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {children}
    </div>
  );
}
