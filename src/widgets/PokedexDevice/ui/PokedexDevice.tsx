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
      className="pokedex-theme relative flex items-start justify-center px-8 pt-6 pb-8 mobile:px-4 mobile:pt-4"
    >
      <div className="relative w-full max-w-[1440px]">
        <PokedexContactShadow />
        <PokedexShell
          leftContent={leftContent}
          rightContent={rightContent}
          nav={nav}
        />
      </div>
    </div>
  );
}
