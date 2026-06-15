import { getTranslations } from 'next-intl/server';

import { Link } from '@/shared/config/navigation/navigation';
import { cn } from '@/shared/lib/utils';

interface Props {
  prevId: number | null;
  nextId: number | null;
}

const navButtonClass = cn(
  'select-none rounded px-3 py-1.5',
  'font-mono text-[10px] font-medium uppercase tracking-[0.18em]',
);

const navButtonStyle = {
  color: 'var(--pdx-hud-ink)',
  background: 'linear-gradient(to bottom, var(--pdx-metal-100) 0%, var(--pdx-metal-500) 100%)',
  boxShadow: 'var(--pdx-sh-button-recess)',
};

function NavButton({ href, label, disabled }: { href: string; label: string; disabled: boolean }) {
  if (disabled) {
    return (
      <span
        className={cn(navButtonClass, 'cursor-not-allowed opacity-40')}
        style={navButtonStyle}
        aria-disabled
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn(navButtonClass, 'transition-transform duration-75 active:translate-y-px')}
      style={navButtonStyle}
    >
      {label}
    </Link>
  );
}

export async function PokemonNavigation({ prevId, nextId }: Props) {
  const t = await getTranslations('pages.pokemon.details.nav');

  return (
    <div className="flex items-center gap-2">
      <NavButton
        href={`/pokemon/${prevId}`}
        label={`◀ ${t('prev')}`}
        disabled={prevId === null}
      />
      <NavButton
        href={`/pokemon/${nextId}`}
        label={`${t('next')} ▶`}
        disabled={nextId === null}
      />
    </div>
  );
}
