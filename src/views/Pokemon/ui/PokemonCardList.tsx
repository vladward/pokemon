import { SearchX } from 'lucide-react';
import Link from 'next/link';

import type { TPokemonCard } from '@/entities/Pokemon';
import { PokemonCard } from '@/entities/Pokemon/ui/PokemonCard';

interface Props {
  items: TPokemonCard[];
}

export const PokemonCardList = ({ items }: Props) => {
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
    <div className="grid grid-cols-pokemon mobile:grid-cols-2 gap-4 min-h-[200px]">
      {items.map((pokemon, index) => (
        <Link
          href={`/pokemon/${pokemon.id}`}
          key={pokemon.id}
          className="flex justify-center"
        >
          <PokemonCard
            pokemon={pokemon}
            priority={index < 10}
          />
        </Link>
      ))}
    </div>
  );
};
