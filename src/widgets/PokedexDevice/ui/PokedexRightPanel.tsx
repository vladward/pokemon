import { PokedexScreenHousing } from '@/widgets/PokedexScreen';

interface Props {
  children?: React.ReactNode;
  stretch?: boolean;
}

export function PokedexRightPanel({ children, stretch }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
      <PokedexScreenHousing className="flex-1" stretch={stretch}>{children}</PokedexScreenHousing>
    </div>
  );
}
