interface Props {
  label?: string;
}

export interface TriggerLabels {
  level_up?: string;
  item?: string;
  trade?: string;
  shed?: string;
  other?: string;
}

export function formatTrigger(
  trigger: string | null,
  minLevel: number | null,
  labels?: TriggerLabels,
): string | undefined {
  if (minLevel) return `Lv.${minLevel}`;
  if (!trigger) return undefined;
  const map: Record<string, string> = {
    'level-up': labels?.level_up ?? 'level up',
    'use-item': labels?.item ?? 'item',
    trade: labels?.trade ?? 'trade',
    shed: labels?.shed ?? 'shed',
    other: labels?.other ?? 'other',
  };
  return map[trigger] ?? trigger.replace(/-/g, ' ');
}

export function EvolutionArrow({ label }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 self-center px-1">
      {label && (
        <span className="text-center font-mono text-[8px] uppercase leading-none tracking-[0.1em] text-pokedex-hud-ink-dim">
          {label}
        </span>
      )}
      <svg
        width="16"
        height="8"
        viewBox="0 0 16 8"
        fill="none"
        aria-hidden
        style={{ filter: 'drop-shadow(0 0 3px var(--pdx-hud-cyan))' }}
      >
        <path
          d="M0 4 H12 M9 1.5 L12.5 4 L9 6.5"
          stroke="var(--pdx-hud-cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
