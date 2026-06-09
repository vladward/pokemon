import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

import { AnalogStick, DPad, LedIndicator } from '@/shared/ui/mechanical';

import { PokedexContactShadow } from './PokedexContactShadow';
import { PokedexShellFrame } from './PokedexShellFrame';

interface Props {
  heroContent: React.ReactNode;
  modules: React.ReactNode[];
  nav?: React.ReactNode;
}

export function PokedexMobileStack({ heroContent, modules, nav }: Props) {
  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: 'var(--pdx-r-shell)',
          background:
            'linear-gradient(135deg, var(--pdx-shell-300) 0%, var(--pdx-shell-500) 50%, var(--pdx-shell-700) 100%)',
          boxShadow:
            'var(--pdx-sh-shell-outer), var(--pdx-sh-shell-bevel-top), var(--pdx-sh-shell-bevel-bottom), var(--pdx-sh-shell-rim)',
        }}
      >
        <PokedexShellFrame />

        <div className="absolute left-5 top-4 z-[11]">
          <LedIndicator />
        </div>

        {/* Hero screen */}
        <div className="px-5 pb-0 pt-12">
          <PokedexScreenHousing>{heroContent}</PokedexScreenHousing>
        </div>

        {/* Horizontal hinge */}
        <div
          className="pdx-hinge my-4 w-full"
          style={{ height: 44, boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6)' }}
        />

        {/* Per-module screens */}
        <div className="flex flex-col gap-4 px-5">
          {modules.map((module, i) => (
            <PokedexScreenHousing key={i}>
              <div className="p-3">{module}</div>
            </PokedexScreenHousing>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between px-7 pb-6 pt-5">
          <DPad />
          {nav}
          <AnalogStick />
        </div>
      </div>

      <PokedexContactShadow />
    </div>
  );
}
