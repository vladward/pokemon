'use client';

import { useTranslations } from 'next-intl';

import { PokedexDevice, PokedexMobileStack } from '@/widgets/PokedexDevice';

import { HudFrame } from '@/shared/ui/hud';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: Props) {
  const t = useTranslations('pages.pokemon.details.error');

  const errorContent = (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden p-4">
      {/* Static noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--pdx-hud-red) 0px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 4px',
        }}
      />
      <HudFrame className="flex flex-col items-center gap-3 px-6 py-4">
        <div
          className="h-1.5 w-10 rounded-full"
          style={{ background: 'var(--pdx-hud-red)', boxShadow: '0 0 8px var(--pdx-hud-red)' }}
        />
        <span
          className="text-center font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: 'var(--pdx-hud-red)' }}
        >
          {t('no_signal')}
        </span>
        <span
          className="text-center font-mono text-[10px] tracking-[0.08em]"
          style={{ color: 'var(--pdx-hud-ink-dim)' }}
        >
          {t('description')}
        </span>
        <button
          onClick={reset}
          className="mt-1 border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[rgba(93,217,216,0.08)]"
          style={{
            borderColor: 'var(--pdx-hud-cyan)',
            color: 'var(--pdx-hud-cyan)',
            borderRadius: 'var(--pdx-r-hud)',
          }}
        >
          {t('retry')}
        </button>
      </HudFrame>
    </div>
  );

  const mobileErrorContent = (
    <div className="relative flex min-h-[160px] w-full flex-col items-center justify-center gap-3 overflow-hidden p-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--pdx-hud-red) 0px, transparent 1px, transparent 3px)',
          backgroundSize: '100% 4px',
        }}
      />
      <span
        className="text-center font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: 'var(--pdx-hud-red)' }}
      >
        {t('no_signal')}
      </span>
      <button
        onClick={reset}
        className="border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:bg-[rgba(93,217,216,0.08)]"
        style={{
          borderColor: 'var(--pdx-hud-cyan)',
          color: 'var(--pdx-hud-cyan)',
          borderRadius: 'var(--pdx-r-hud)',
        }}
      >
        {t('retry')}
      </button>
    </div>
  );

  return (
    <>
      <div className="mobile:hidden">
        <PokedexDevice
          leftContent={errorContent}
          rightContent={errorContent}
        />
      </div>
      <div className="pokedex-theme hidden mobile:block">
        <div
          className="flex min-h-screen items-start justify-center p-4"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #16161a 0%, #000 100%)' }}
        >
          <div className="w-full max-w-sm">
            <PokedexMobileStack
              heroContent={mobileErrorContent}
              modules={[mobileErrorContent]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
