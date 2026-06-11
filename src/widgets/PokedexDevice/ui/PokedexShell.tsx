import { cn } from '@/shared/lib/utils';

import { PokedexHinge } from './PokedexHinge';
import { PokedexLeftPanel } from './PokedexLeftPanel';
import { PokedexRightPanel } from './PokedexRightPanel';
import { PokedexShellFrame } from './PokedexShellFrame';

interface Props {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  nav?: React.ReactNode;
  stretch?: boolean;
}

export function PokedexShell({ leftContent, rightContent, nav, stretch }: Props) {
  return (
    <div
      className={cn(
        'relative flex w-full overflow-hidden laptop:flex-col laptop:min-h-0',
        stretch ? 'flex-1' : 'min-h-[680px]',
      )}
      style={{
        borderRadius: 'var(--pdx-r-shell)',
        background:
          'linear-gradient(135deg, var(--pdx-shell-300) 0%, var(--pdx-shell-500) 50%, var(--pdx-shell-700) 100%)',
        boxShadow:
          'var(--pdx-sh-shell-outer), var(--pdx-sh-shell-bevel-top), var(--pdx-sh-shell-bevel-bottom), var(--pdx-sh-shell-rim), 0 0 80px rgba(200,52,44,0.12)',
      }}
    >
      <PokedexShellFrame />
      <PokedexLeftPanel nav={nav} stretch={stretch}>{leftContent}</PokedexLeftPanel>
      <PokedexHinge />
      <PokedexRightPanel stretch={stretch}>{rightContent}</PokedexRightPanel>
    </div>
  );
}
