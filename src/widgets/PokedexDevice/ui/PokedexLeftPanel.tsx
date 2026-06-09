import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

import { DPad, LedIndicator, Lens } from '@/shared/ui/mechanical';

interface Props {
  children?: React.ReactNode;
  nav?: React.ReactNode;
}

export function PokedexLeftPanel({ children, nav }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
      <PokedexScreenHousing className="flex-1">{children}</PokedexScreenHousing>
      {/* Controls row */}
      <div className="flex items-center justify-between px-2">
        <div className="laptop:hidden">
          <DPad />
        </div>
        <div className="flex items-center gap-3">
          <LedIndicator size="lg" />
          <Lens />
          <Lens />
        </div>
        {nav}
      </div>
    </div>
  );
}
