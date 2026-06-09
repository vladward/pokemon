import { cn } from '@/shared/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function HudLabel({ children, className }: Props) {
  return (
    <span
      className={cn(
        'block font-mono text-[11px] font-medium uppercase leading-none tracking-[0.18em]',
        'text-pokedex-hud-ink-dim',
        className,
      )}
    >
      {children}
    </span>
  );
}
