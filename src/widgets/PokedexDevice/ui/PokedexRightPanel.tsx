import { AnalogStick } from '@/shared/ui/mechanical';
import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

interface Props {
  children?: React.ReactNode;
}

export function PokedexRightPanel({ children }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
      <PokedexScreenHousing className="flex-1">{children}</PokedexScreenHousing>
      {/* Bottom controls row */}
      <div className="flex justify-end px-2">
        <AnalogStick />
      </div>
    </div>
  );
}
