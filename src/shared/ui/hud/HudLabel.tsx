import { cn } from '@/shared/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function HudLabel({ children, className }: Props) {
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em]',
        'text-pokedex-hud-ink-dim',
        className,
      )}
    >
      <span
        className="inline-block h-[8px] w-[2px] flex-none rounded-full"
        style={{ background: 'var(--pdx-hud-cyan)', opacity: 0.7 }}
        aria-hidden
      />
      {children}
    </span>
  );
}
