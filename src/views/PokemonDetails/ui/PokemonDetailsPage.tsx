import type { TPokemonDetails } from '@/entities/Pokemon';
import { PokemonAbilitiesPanel } from '@/widgets/PokemonAbilities';
import { PokemonBiologyPanel } from '@/widgets/PokemonBiology';
import { PokemonEvolutionPanel } from '@/widgets/PokemonEvolution';
import { PokemonFormsPanel } from '@/widgets/PokemonForms';
import { PokemonHeroDisplay } from '@/widgets/PokemonHero';
import { PokemonRegionsPanel } from '@/widgets/PokemonRegions';
import { PokemonStatsPanel } from '@/widgets/PokemonStats';
import { PokedexDevice } from '@/widgets/PokedexDevice';

interface Props {
  pokemon: TPokemonDetails;
  nav?: React.ReactNode;
}

export function PokemonDetailsPage({ pokemon, nav }: Props) {
  return (
    <PokedexDevice
      leftContent={<PokemonHeroDisplay pokemon={pokemon} />}
      nav={nav}
      rightContent={
        <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
          <PokemonStatsPanel stats={pokemon.stats} />
          <PokemonAbilitiesPanel abilities={pokemon.abilities} />
          <PokemonEvolutionPanel
            evolutions={pokemon.evolutions}
            evolutionSteps={pokemon.evolutionSteps}
          />
          <PokemonBiologyPanel biology={pokemon.biology} />
          <PokemonRegionsPanel locations={pokemon.locations} />
          <PokemonFormsPanel forms={pokemon.forms} />
        </div>
      }
    />
  );
}
