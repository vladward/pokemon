import { PokedexScrew } from './PokedexScrew';

export function PokedexHinge() {
  return (
    <div
      className="pdx-hinge relative z-[4] flex w-[44px] flex-none flex-col items-center justify-between py-6 laptop:h-[44px] laptop:w-full laptop:flex-row laptop:px-6 laptop:py-0"
      style={{
        boxShadow:
          'inset 0 4px 10px rgba(0,0,0,0.75), inset 0 -4px 10px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.20), 0 1px 0 rgba(255,255,255,0.07)',
      }}
    >
      <PokedexScrew />
      <PokedexScrew />
    </div>
  );
}
