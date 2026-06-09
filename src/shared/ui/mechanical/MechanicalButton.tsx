'use client';

import { cn } from '@/shared/lib/utils';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function MechanicalButton({ children, onClick, disabled, className }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'select-none rounded px-3 py-1.5',
        'font-mono text-[10px] font-medium uppercase tracking-[0.18em]',
        'transition-transform duration-75 active:translate-y-px',
        'disabled:cursor-not-allowed disabled:opacity-40',
        className,
      )}
      style={{
        color: 'var(--pdx-hud-ink)',
        background:
          'linear-gradient(to bottom, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 100%)',
        boxShadow: 'var(--pdx-sh-button-recess)',
      }}
    >
      {children}
    </button>
  );
}
