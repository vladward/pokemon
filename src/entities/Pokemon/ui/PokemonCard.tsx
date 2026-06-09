import type { TPokemonCard as PokemonCardType } from '../TPokemonCard';

import { PokemonCardBase } from './card/variants/PokemonCardBase';
import { PokemonCardLegendary } from './card/variants/PokemonCardLegendary';
import { PokemonCardMythical } from './card/variants/PokemonCardMythical';

interface Props {
  pokemon: PokemonCardType;
  priority?: boolean;
}

export const PokemonCard = ({ pokemon, priority }: Props) => {
  if (pokemon.rarity === 'legendary')
    return (
      <PokemonCardLegendary
        pokemon={pokemon}
        priority={priority}
      />
    );
  if (pokemon.rarity === 'mythical')
    return (
      <PokemonCardMythical
        pokemon={pokemon}
        priority={priority}
      />
    );
  return (
    <PokemonCardBase
      pokemon={pokemon}
      priority={priority}
    />
  );
};
