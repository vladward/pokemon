import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

import { AnalogStick, DPad } from '@/shared/ui/mechanical';

interface Props {
  children?: React.ReactNode;
}

export function PokedexRightPanel({ children }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
      <PokedexScreenHousing className="flex-1">{children}</PokedexScreenHousing>
      {/* Bottom controls row — D-pad appears on tablet (replaces left-panel position) */}
      <div className="flex items-center justify-end px-2 laptop:justify-between">
        <div className="hidden laptop:block">
          <DPad />
        </div>
        <AnalogStick />
      </div>
    </div>
  );
}
