import { cn } from '@/shared/lib/utils';

import type { TForm } from '@/entities/Pokemon';

interface Props {
  form: TForm;
}

export function FormThumbnail({ form }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 rounded p-1.5',
        form.isCurrent && 'bg-[rgba(93,217,216,0.08)]',
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
      <div className="relative h-10 w-10 flex-none">
        {form.sprite ? (
          <img
            src={form.sprite}
            alt={form.name}
            width={40}
            height={40}
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
          'w-14 truncate text-center font-mono text-[8px] capitalize leading-tight',
          form.isCurrent ? 'text-pokedex-hud-ink' : 'text-pokedex-hud-ink-dim',
        )}
      >
        {form.name}
      </span>
    </div>
  );
}
