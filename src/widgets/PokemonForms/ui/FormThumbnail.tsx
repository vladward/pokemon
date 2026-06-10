import Link from 'next/link';

import type { TForm } from '@/entities/Pokemon';

import { cn } from '@/shared/lib/utils';

interface Props {
  form: TForm;
  className?: string;
}

export function FormThumbnail({ form, className }: Props) {
  return (
    <Link
      href={`/pokemon/${form.pokemonId}`}
      data-current={form.isCurrent ? 'true' : undefined}
      className={cn(
        'flex flex-col items-center gap-1 rounded p-1.5 transition-colors hover:bg-[rgba(93,217,216,0.06)]',
        form.isCurrent && 'bg-[rgba(93,217,216,0.08)]',
        className,
      )}
      style={
        form.isCurrent
          ? {
              boxShadow: '0 0 0 1px var(--pdx-hud-cyan), 0 0 6px var(--pdx-hud-cyan-glow)',
              borderRadius: 'var(--pdx-r-hud)',
            }
          : undefined
      }
    >
      <div className="relative h-[120px] w-[120px] flex-none">
        {form.sprite ? (
          <img
            src={form.sprite}
            alt={form.name}
            width={120}
            height={120}
            className={cn('h-full w-full object-contain', !form.isCurrent && 'opacity-55')}
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <div
            className="h-full w-full rounded-full opacity-20"
            style={{ background: 'var(--pdx-hud-cyan)' }}
          />
        )}
      </div>
      <span
        className={cn(
          'w-[120px] truncate text-center font-mono text-[8px] capitalize leading-tight',
          form.isCurrent ? 'text-pokedex-hud-ink' : 'text-pokedex-hud-ink-dim',
        )}
      >
        {form.name}
      </span>
    </Link>
  );
}
