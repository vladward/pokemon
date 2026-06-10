import { getTranslations } from 'next-intl/server';

import { PokedexDevice, PokedexMobileStack } from '@/widgets/PokedexDevice';

export default async function Loading() {
  const t = await getTranslations('pages.pokemon.details.loading');

  const scannerContent = (
    <div className="relative flex h-full min-h-[220px] w-full items-center justify-center overflow-hidden">
      <div
        className="pdx-boot-scan-loop absolute inset-x-0 h-[2px]"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, var(--pdx-hud-cyan) 50%, transparent 100%)',
          boxShadow: '0 0 6px var(--pdx-hud-cyan), 0 0 18px var(--pdx-hud-cyan-glow)',
        }}
      />
      <div className="flex flex-col items-center gap-1.5">
        <span
          className="pdx-led-breathe motion-safe:animate-pdx-led-breathe font-mono text-[11px] uppercase tracking-[0.18em] p-2 rounded-xl mb-3"
          style={{ color: 'var(--pdx-hud-cyan)' }}
        >
          {t('scanning')}
        </span>
        <span
          className="font-mono text-[10px] tracking-[0.12em]"
          style={{ color: 'var(--pdx-hud-ink-dim)' }}
        >
          {t('initializing')}
        </span>
      </div>
    </div>
  );

  const mobileScanContent = (
    <div className="relative flex min-h-[140px] w-full items-center justify-center overflow-hidden">
      <div
        className="pdx-boot-scan-loop absolute inset-x-0 h-[2px]"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, var(--pdx-hud-cyan) 50%, transparent 100%)',
          boxShadow: '0 0 6px var(--pdx-hud-cyan), 0 0 18px var(--pdx-hud-cyan-glow)',
        }}
      />
      <span
        className="pdx-led-breathe motion-safe:animate-pdx-led-breathe font-mono text-[11px] uppercase tracking-[0.18em]  p-2 rounded-xl mb-3"
        style={{ color: 'var(--pdx-hud-cyan)' }}
      >
        {t('scanning')}
      </span>
    </div>
  );

  return (
    <>
      <div className="mobile:hidden">
        <PokedexDevice
          leftContent={scannerContent}
          rightContent={scannerContent}
        />
      </div>
      <div className="pokedex-theme hidden mobile:block">
        <div className="flex min-h-screen items-start justify-center p-4 bg-background">
          <div className="w-full max-w-sm">
            <PokedexMobileStack
              heroContent={mobileScanContent}
              modules={[mobileScanContent]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
