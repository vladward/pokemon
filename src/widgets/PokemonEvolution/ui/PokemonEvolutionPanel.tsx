import type { TEvolutionNode, TEvolutionStep } from '@/entities/Pokemon';

import { HudSection } from '@/shared/ui/hud';
import { ScrollToActive } from '@/shared/ui/ScrollToActive';

import { EvolutionArrow, formatTrigger } from './EvolutionArrow';
import { EvolutionNode } from './EvolutionNode';

interface Props {
  evolutions: TEvolutionNode[];
  evolutionSteps: TEvolutionStep[];
  label?: string;
}

function buildStages(nodes: TEvolutionNode[], steps: TEvolutionStep[]): TEvolutionNode[][] {
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
  const step = steps.find((s) => fromIds.has(s.fromSpeciesId) && toIds.has(s.toSpeciesId));
  return step ? formatTrigger(step.trigger, step.minLevel) : undefined;
}

function getNodeArrowLabel(
  fromStage: TEvolutionNode[],
  toSpeciesId: number,
  steps: TEvolutionStep[],
): string | undefined {
  const fromIds = new Set(fromStage.map((n) => n.speciesId));
  const step = steps.find((s) => fromIds.has(s.fromSpeciesId) && s.toSpeciesId === toSpeciesId);
  return step ? formatTrigger(step.trigger, step.minLevel) : undefined;
}

export function PokemonEvolutionPanel({
  evolutions,
  evolutionSteps,
  label = 'EVOLUTION CHAIN',
}: Props) {
  const stages = buildStages(evolutions, evolutionSteps);

  if (stages.length === 0) return null;

  const isBranching = stages.some((stage) => stage.length > 1);

  return (
    <HudSection label={label}>
      <ScrollToActive className="snap-x snap-mandatory overflow-x-auto scroll-pl-3">
        <div className="flex min-w-max items-start justify-center gap-1 py-1 px-3">
          {stages.map((stage, si) => (
            <div
              key={si}
              className="flex snap-start items-center gap-1"
            >
              {stage.length === 1 ? (
                <>
                  {si > 0 && (
                    <EvolutionArrow label={getArrowLabel(stages[si - 1], stage, evolutionSteps)} />
                  )}
                  <EvolutionNode node={stage[0]} />
                </>
              ) : (
                <div className="flex flex-col gap-1">
                  {[...stage]
                    .sort((a, b) => (b.isCurrent ? 1 : 0) - (a.isCurrent ? 1 : 0))
                    .map((node) => (
                      <div
                        key={node.speciesId}
                        className="flex items-center gap-1"
                      >
                        {si > 0 && (
                          <EvolutionArrow
                            label={getNodeArrowLabel(
                              stages[si - 1],
                              node.speciesId,
                              evolutionSteps,
                            )}
                          />
                        )}
                        <EvolutionNode node={node} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollToActive>
      {isBranching && (
        <div className="flex items-center gap-1 pt-0.5">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden
          >
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
