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
        background: 'var(--pdx-shell-bg)',
        boxShadow: 'var(--pdx-sh-shell-stack), 0 0 80px rgba(200,52,44,0.12)',
      }}
    >
      <PokedexShellFrame />
      <PokedexLeftPanel nav={nav} stretch={stretch}>{leftContent}</PokedexLeftPanel>
      <PokedexHinge />
      <PokedexRightPanel stretch={stretch}>{rightContent}</PokedexRightPanel>
    </div>
  );
}
