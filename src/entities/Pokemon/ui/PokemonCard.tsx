import type { TPokemonCard as PokemonCardType } from '../TPokemonCard';

import { PokemonCardBase } from './card/variants/PokemonCardBase';
import { PokemonCardLegendary } from './card/variants/PokemonCardLegendary';
import { PokemonCardMythical } from './card/variants/PokemonCardMythical';

interface Props {
  pokemon: PokemonCardType;
}

export const PokemonCard = ({ pokemon }: Props) => {
  if (pokemon.rarity === 'legendary') return <PokemonCardLegendary pokemon={pokemon} />;
  if (pokemon.rarity === 'mythical') return <PokemonCardMythical pokemon={pokemon} />;
  return <PokemonCardBase pokemon={pokemon} />;
};
