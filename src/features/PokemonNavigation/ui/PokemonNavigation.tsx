import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

interface Props {
  prevId: number | null;
  nextId: number | null;
  locale: string;
}

function NavButton({
  href,
  label,
  disabled,
}: {
  href: string;
  label: string;
  disabled: boolean;
}) {
  if (disabled) {
    return (
      <span
        className={cn(
          'select-none rounded px-3 py-1.5',
          'font-mono text-[10px] font-medium uppercase tracking-[0.18em]',
          'cursor-not-allowed opacity-40',
        )}
        style={{
          color: 'var(--pdx-hud-ink)',
          background:
            'linear-gradient(to bottom, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 100%)',
          boxShadow: 'var(--pdx-sh-button-recess)',
        }}
        aria-disabled
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        'select-none rounded px-3 py-1.5',
        'font-mono text-[10px] font-medium uppercase tracking-[0.18em]',
        'transition-transform duration-75 active:translate-y-px',
      )}
      style={{
        color: 'var(--pdx-hud-ink)',
        background:
          'linear-gradient(to bottom, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 100%)',
        boxShadow: 'var(--pdx-sh-button-recess)',
      }}
    >
      {label}
    </Link>
  );
}

export function PokemonNavigation({ prevId, nextId, locale }: Props) {
  return (
    <div className="flex items-center gap-2">
      <NavButton
        href={`/${locale}/pokemon/${prevId}`}
        label="◀ PREV"
        disabled={prevId === null}
      />
      <NavButton
        href={`/${locale}/pokemon/${nextId}`}
        label="NEXT ▶"
        disabled={nextId === null}
      />
    </div>
  );
}
