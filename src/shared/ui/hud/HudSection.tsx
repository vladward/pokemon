import { cn } from '@/shared/lib/utils';

import { HudFrame } from './HudFrame';
import { HudLabel } from './HudLabel';

interface Props {
  label: string;
  children?: React.ReactNode;
  className?: string;
}

export function HudSection({ label, children, className }: Props) {
  return (
    <section
      className={cn('relative', className)}
      style={{
        borderRadius: 'var(--pdx-r-hud)',
        boxShadow: 'var(--pdx-sh-hud-corner-glow)',
      }}
      aria-label={label}
    >
      <HudFrame className="h-full">
        <div className="flex flex-col gap-2 px-1">
          <HudLabel>{label}</HudLabel>
          {children}
        </div>
      </HudFrame>
    </section>
  );
}
