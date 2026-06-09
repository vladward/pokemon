import { LedIndicator } from '@/shared/ui/mechanical';

import { PokedexHinge } from './PokedexHinge';
import { PokedexLeftPanel } from './PokedexLeftPanel';
import { PokedexRightPanel } from './PokedexRightPanel';
import { PokedexShellFrame } from './PokedexShellFrame';

interface Props {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  nav?: React.ReactNode;
}

export function PokedexShell({ leftContent, rightContent, nav }: Props) {
  return (
    <div
      className="relative flex w-full aspect-[16/10] overflow-hidden laptop:aspect-auto laptop:flex-col"
      style={{
        borderRadius: 'var(--pdx-r-shell)',
        background:
          'linear-gradient(135deg, var(--pdx-shell-300) 0%, var(--pdx-shell-500) 50%, var(--pdx-shell-700) 100%)',
        boxShadow:
          'var(--pdx-sh-shell-outer), var(--pdx-sh-shell-bevel-top), var(--pdx-sh-shell-bevel-bottom), var(--pdx-sh-shell-rim)',
      }}
    >
      <PokedexShellFrame />
      {/* Top-left cyan LED */}
      <div className="absolute left-5 top-4 z-[11]">
        <LedIndicator />
      </div>
      <PokedexLeftPanel nav={nav}>{leftContent}</PokedexLeftPanel>
      <PokedexHinge />
      <PokedexRightPanel>{rightContent}</PokedexRightPanel>
    </div>
  );
}
