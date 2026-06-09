import { PokedexScrew } from './PokedexScrew';

export function PokedexHinge() {
  return (
    <div
      className="pdx-hinge relative z-[4] flex w-[44px] flex-none flex-col items-center justify-between py-6 laptop:h-[44px] laptop:w-full laptop:flex-row laptop:px-6 laptop:py-0"
      style={{ boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6)' }}
    >
      <PokedexScrew />
      <PokedexScrew />
    </div>
  );
}
