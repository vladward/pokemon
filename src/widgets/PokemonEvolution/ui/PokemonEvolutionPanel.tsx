import { HudSection } from '@/shared/ui/hud';

import type { TEvolutionNode, TEvolutionStep } from '@/entities/Pokemon';

import { EvolutionArrow, formatTrigger } from './EvolutionArrow';
import { EvolutionNode } from './EvolutionNode';

interface Props {
  evolutions: TEvolutionNode[];
  evolutionSteps: TEvolutionStep[];
}

function buildStages(
  nodes: TEvolutionNode[],
  steps: TEvolutionStep[],
): TEvolutionNode[][] {
  if (nodes.length === 0) return [];

  const toIds = new Set(steps.map((s) => s.toSpeciesId));
  const roots = nodes.filter((n) => !toIds.has(n.speciesId));

  if (roots.length === 0) return [nodes];

  const stages: TEvolutionNode[][] = [];
  const visited = new Set<number>();
  let current = roots;

  while (current.length > 0) {
    stages.push(current);
    current.forEach((n) => visited.add(n.speciesId));

    const nextSpeciesIds = steps
      .filter((s) => current.some((n) => n.speciesId === s.fromSpeciesId))
      .map((s) => s.toSpeciesId);

    current = nodes.filter(
      (n) => nextSpeciesIds.includes(n.speciesId) && !visited.has(n.speciesId),
    );
  }

  return stages;
}

function getArrowLabel(
  fromStage: TEvolutionNode[],
  toStage: TEvolutionNode[],
  steps: TEvolutionStep[],
): string | undefined {
  const fromIds = new Set(fromStage.map((n) => n.speciesId));
  const toIds = new Set(toStage.map((n) => n.speciesId));

  const relevant = steps.filter((s) => fromIds.has(s.fromSpeciesId) && toIds.has(s.toSpeciesId));
  if (relevant.length === 0) return undefined;

  const first = relevant[0];
  return formatTrigger(first.trigger, first.minLevel);
}

export function PokemonEvolutionPanel({ evolutions, evolutionSteps }: Props) {
  const stages = buildStages(evolutions, evolutionSteps);

  if (stages.length === 0) return null;

  const isBranching = stages.some((stage) => stage.length > 1);

  return (
    <HudSection label="Evolution Chain">
      <div className="overflow-x-auto">
        <div className="flex min-w-max items-center gap-1 pb-1">
          {stages.map((stage, si) => (
            <div key={si} className="flex items-center gap-1">
              {si > 0 && (
                <EvolutionArrow
                  label={getArrowLabel(stages[si - 1], stage, evolutionSteps)}
                />
              )}
              <div className="flex flex-col items-center gap-1">
                {stage.map((node) => (
                  <EvolutionNode key={node.speciesId} node={node} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isBranching && (
        <div className="flex items-center gap-1 pt-0.5">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
            <path
              d="M1 3 H9 M6.5 1 L9 3 L6.5 5"
              stroke="var(--pdx-hud-cyan)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-pokedex-hud-ink-dim">
            scroll
          </span>
        </div>
      )}
    </HudSection>
  );
}
