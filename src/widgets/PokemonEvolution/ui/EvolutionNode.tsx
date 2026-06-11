import type { TEvolutionNode } from '@/entities/Pokemon';

import { SpriteThumbnail } from '@/shared/ui/SpriteThumbnail';

interface Props {
  node: TEvolutionNode;
}

export function EvolutionNode({ node }: Props) {
  return (
    <SpriteThumbnail
      pokemonId={node.pokemonId}
      sprite={node.sprite}
      name={node.name}
      isCurrent={node.isCurrent}
      size="lg"
    />
  );
}
