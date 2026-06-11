import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

import { LedIndicator } from '@/shared/ui/mechanical';

import { PokedexContactShadow } from './PokedexContactShadow';
import { PokedexHinge } from './PokedexHinge';
import { PokedexShellFrame } from './PokedexShellFrame';

interface Props {
  heroContent: React.ReactNode;
  modules: React.ReactNode[];
  nav?: React.ReactNode;
  stretch?: boolean;
}

export function PokedexMobileStack({ heroContent, modules, nav, stretch }: Props) {
  return (
    <div className={stretch ? 'relative flex flex-1 flex-col w-full' : 'relative w-full'}>
      <div
        className={stretch ? 'relative flex flex-1 flex-col w-full overflow-hidden' : 'relative w-full overflow-hidden'}
        style={{
          borderRadius: 'var(--pdx-r-shell)',
          background: 'var(--pdx-shell-bg)',
          boxShadow: 'var(--pdx-sh-shell-stack)',
        }}
      >
        <PokedexShellFrame />

        <div className="absolute left-4 top-3 z-[11]">
          <LedIndicator />
        </div>

        {/* Hero screen */}
        <div className={stretch ? 'flex flex-1 flex-col px-5 pb-0 pt-12' : 'px-5 pb-0 pt-12'}>
          <PokedexScreenHousing className={stretch ? 'flex-1' : undefined} stretch={stretch}>
            {heroContent}
          </PokedexScreenHousing>
        </div>

        {/* Horizontal hinge */}
        <PokedexHinge />

        {/* Per-module screens */}
        <div className={stretch ? 'flex flex-1 flex-col gap-4 px-5' : 'flex flex-col gap-4 px-5'}>
          {modules.map((module, i) => (
            <PokedexScreenHousing key={i} className={stretch ? 'flex-1' : undefined} stretch={stretch}>
              <div className={stretch ? 'p-3 flex flex-col flex-1' : 'p-3'}>{module}</div>
            </PokedexScreenHousing>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-end px-7 pb-6 pt-5">{nav}</div>
      </div>

      <PokedexContactShadow />
    </div>
  );
}
