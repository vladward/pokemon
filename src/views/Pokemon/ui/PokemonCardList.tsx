import { SearchX } from 'lucide-react';
import Link from 'next/link';

import type { PokemonCard } from '@/entities/Pokemon';
import { PokemonCard as PokemonCardComponent } from '@/entities/Pokemon/ui/PokemonCard';

interface Props {
  items: PokemonCard[];
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
    <div className="flex flex-wrap justify-center gap-4 min-h-[200px]">
      {items.map((pokemon) => (
        <Link
          href={`/pokemon/${pokemon.id}`}
          key={pokemon.id}
        >
          <PokemonCardComponent pokemon={pokemon} />
        </Link>
      ))}
    </div>
  );
};
