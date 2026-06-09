import type { TPokemonDetails } from '@/entities/Pokemon';
import { PokemonAbilitiesPanel } from '@/widgets/PokemonAbilities';
import { PokemonHeroDisplay } from '@/widgets/PokemonHero';
import { PokemonStatsPanel } from '@/widgets/PokemonStats';
import { PokedexDevice } from '@/widgets/PokedexDevice';

interface Props {
  pokemon: TPokemonDetails;
}

export function PokemonDetailsPage({ pokemon }: Props) {
  return (
    <PokedexDevice
      leftContent={<PokemonHeroDisplay pokemon={pokemon} />}
      rightContent={
        <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
          <PokemonStatsPanel stats={pokemon.stats} />
          <PokemonAbilitiesPanel abilities={pokemon.abilities} />
        </div>
      }
    />
  );
}
