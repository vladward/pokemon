import { SearchX } from 'lucide-react';
import type { ComponentType } from 'react';

import type { PokemonCard } from '@/entities/Pokemon';

import { PokemonLoader } from './PokemonLoader';

interface Props {
  items: PokemonCard[];
  CardComponent: ComponentType<{ pokemon: PokemonCard }>;
  isPending?: boolean;
}

export const PokemonCardList = ({ items, CardComponent, isPending }: Props) => {
  if (isPending && items.length === 0) {
    return <PokemonLoader />;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
        <SearchX
          className="size-10"
          strokeWidth={1.5}
        />
        <p className="text-sm">No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 min-h-[200px]">
      {items.map((pokemon) => (
        <CardComponent
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};
