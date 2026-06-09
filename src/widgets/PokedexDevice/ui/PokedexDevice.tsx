import { PokedexContactShadow } from './PokedexContactShadow';
import { PokedexShell } from './PokedexShell';

interface Props {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  nav?: React.ReactNode;
}

export function PokedexDevice({ leftContent, rightContent, nav }: Props) {
  return (
    <div
      className="pokedex-theme relative flex min-h-screen items-center justify-center p-8"
      style={{
        background: 'radial-gradient(ellipse at 50% 60%, #16161a 0%, #000 100%)',
      }}
    >
      <div className="relative w-full max-w-[1440px]">
        <PokedexContactShadow />
        <PokedexShell leftContent={leftContent} rightContent={rightContent} nav={nav} />
      </div>
    </div>
  );
}
