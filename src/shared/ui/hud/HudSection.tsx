import { cn } from '@/shared/lib/utils';

import { HudFrame } from './HudFrame';
import { HudLabel } from './HudLabel';

interface Props {
  label: string;
  children?: React.ReactNode;
  className?: string;
  withShadow?: boolean;
}

export function HudSection({ label, children, className, withShadow = false }: Props) {
  return (
    <section
      className={cn('relative', className)}
      style={{
        ...(withShadow && { boxShadow: 'var(--pdx-sh-hud-corner-glow)' }),
      }}
      aria-label={label}
    >
      <HudFrame className="h-full">
        <div className="flex flex-col gap-2 p-3 max-h-[260px] overflow-y-auto">
          <HudLabel>{label}</HudLabel>
          <div
            className="h-px opacity-20"
            style={{ background: 'var(--pdx-hud-cyan)' }}
          />
          {children}
        </div>
      </HudFrame>
    </section>
  );
}
