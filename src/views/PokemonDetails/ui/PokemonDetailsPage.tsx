import { PokedexDevice, PokedexMobileStack } from '@/widgets/PokedexDevice';
import { PokemonAbilitiesPanel } from '@/widgets/PokemonAbilities';
import { PokemonBiologyPanel } from '@/widgets/PokemonBiology';
import { PokemonEvolutionPanel } from '@/widgets/PokemonEvolution';
import { PokemonFormsPanel } from '@/widgets/PokemonForms';
import { PokemonHeroDisplay } from '@/widgets/PokemonHero';
import { PokemonRegionsPanel } from '@/widgets/PokemonRegions';
import { PokemonStatsPanel } from '@/widgets/PokemonStats';

import type { TPokemonDetails } from '@/entities/Pokemon';

interface Props {
  pokemon: TPokemonDetails;
  nav?: React.ReactNode;
}

export function PokemonDetailsPage({ pokemon, nav }: Props) {
  const heroContent = <PokemonHeroDisplay pokemon={pokemon} />;

  const mobileModules = [
    <PokemonStatsPanel key="stats" stats={pokemon.stats} />,
    <PokemonAbilitiesPanel key="abilities" abilities={pokemon.abilities} />,
    pokemon.evolutions.length > 0 && (
      <PokemonEvolutionPanel
        key="evolution"
        evolutions={pokemon.evolutions}
        evolutionSteps={pokemon.evolutionSteps}
      />
    ),
    <PokemonBiologyPanel key="biology" biology={pokemon.biology} />,
    pokemon.locations.length > 0 && (
      <PokemonRegionsPanel key="regions" locations={pokemon.locations} />
    ),
    pokemon.forms.length > 1 && (
      <PokemonFormsPanel key="forms" forms={pokemon.forms} />
    ),
  ].filter(Boolean) as React.ReactNode[];

  return (
    <>
      {/* Desktop + Tablet (≥577px) */}
      <div className="mobile:hidden">
        <PokedexDevice
          leftContent={heroContent}
          nav={nav}
          rightContent={
            <div className="flex h-full flex-col gap-4 overflow-y-auto p-4 laptop:h-auto laptop:overflow-y-visible">
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
      </div>

      {/* Mobile (≤576px) */}
      <div className="pokedex-theme hidden mobile:block">
        <div
          className="flex min-h-screen items-start justify-center p-4"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #16161a 0%, #000 100%)' }}
        >
          <div className="w-full max-w-sm">
            <PokedexMobileStack
              heroContent={heroContent}
              modules={mobileModules}
              nav={nav}
            />
          </div>
        </div>
      </div>
    </>
  );
}
