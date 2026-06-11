import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

import { DPad, LedIndicator, Lens } from '@/shared/ui/mechanical';

interface Props {
  children?: React.ReactNode;
  nav?: React.ReactNode;
}

export function PokedexLeftPanel({ children, nav }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 pt-7 px-5 pb-5">
      {/* Top indicator strip */}
      <div className="flex items-center gap-3 px-1">
        <LedIndicator size="xl" />
        <Lens
          size="sm"
          color="red"
        />
        <Lens
          size="sm"
          color="yellow"
        />
        <Lens
          size="sm"
          color="green"
        />
      </div>
      <PokedexScreenHousing className="flex-1">{children}</PokedexScreenHousing>
      {/* Controls row */}
      <div className="flex items-center justify-between px-2">
        <div className="laptop:hidden">
          <DPad />
        </div>
        {nav}
      </div>
    </div>
  );
}
