import { cn } from '@/shared/lib/utils';

import { PokedexContactShadow } from './PokedexContactShadow';
import { PokedexShell } from './PokedexShell';

interface Props {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  nav?: React.ReactNode;
  stretch?: boolean;
}

export function PokedexDevice({ leftContent, rightContent, nav, stretch }: Props) {
  return (
    <div
      className={cn(
        'pokedex-theme relative flex px-8 pt-6 pb-8 mobile:px-4 mobile:pt-4',
        stretch ? 'flex-col flex-1' : 'items-start justify-center',
      )}
    >
      <div className={cn('relative w-full max-w-[1440px]', stretch && 'flex flex-col flex-1')}>
        <PokedexContactShadow />
        <PokedexShell
          leftContent={leftContent}
          rightContent={rightContent}
          nav={nav}
          stretch={stretch}
        />
      </div>
    </div>
  );
}
