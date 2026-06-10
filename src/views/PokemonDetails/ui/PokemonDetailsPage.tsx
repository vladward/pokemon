import { getTranslations } from 'next-intl/server';

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

export async function PokemonDetailsPage({ pokemon, nav }: Props) {
  const t = await getTranslations('pages.pokemon.details.hud');

  const heroContent = (
    <div>
      <PokemonHeroDisplay
        pokemon={pokemon}
        entryLabel={t('entry')}
      />

      {pokemon.evolutions.length > 0 && (
        <div className="col-span-2">
          <PokemonEvolutionPanel
            label={t('evolution')}
            evolutions={pokemon.evolutions}
            evolutionSteps={pokemon.evolutionSteps}
          />
        </div>
      )}
    </div>
  );

  const mobileModules = [
    <PokemonStatsPanel
      key="stats"
      label={t('status')}
      stats={pokemon.stats}
    />,
    <PokemonAbilitiesPanel
      key="abilities"
      label={t('abilities')}
      abilities={pokemon.abilities}
    />,
    pokemon.evolutions.length > 0 && (
      <PokemonEvolutionPanel
        key="evolution"
        label={t('evolution')}
        evolutions={pokemon.evolutions}
        evolutionSteps={pokemon.evolutionSteps}
      />
    ),
    <PokemonBiologyPanel
      key="biology"
      label={t('biology')}
      biology={pokemon.biology}
    />,
    pokemon.locations.length > 0 && (
      <PokemonRegionsPanel
        key="regions"
        label={t('location')}
        locations={pokemon.locations}
      />
    ),
    pokemon.forms.length > 1 && (
      <PokemonFormsPanel
        key="forms"
        label={t('forms')}
        forms={pokemon.forms}
      />
    ),
  ].filter(Boolean) as React.ReactNode[];

  const rightContent = (
    <div className="relative h-full laptop:h-auto">
      {/* Fade indicator at the bottom when content overflows */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-8 laptop:hidden"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--pdx-screen-bg-0))' }}
      />
      <div className="grid h-full content-start grid-cols-2 gap-3 overflow-y-auto p-4 tablet:grid-cols-1 laptop:h-auto laptop:overflow-y-visible">
        <PokemonStatsPanel
          label={t('status')}
          stats={pokemon.stats}
        />
        <PokemonAbilitiesPanel
          label={t('abilities')}
          abilities={pokemon.abilities}
        />
        <div className={pokemon.locations.length === 0 ? 'col-span-2' : undefined}>
          <PokemonBiologyPanel
            label={t('biology')}
            biology={pokemon.biology}
          />
        </div>
        {pokemon.locations.length > 0 && (
          <PokemonRegionsPanel
            label={t('location')}
            locations={pokemon.locations}
          />
        )}
        {pokemon.forms.length > 1 && (
          <div className="col-span-2">
            <PokemonFormsPanel
              label={t('forms')}
              forms={pokemon.forms}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop + Tablet (≥577px) */}
      <div className="mobile:hidden flex-1 bg-background">
        <PokedexDevice
          leftContent={heroContent}
          nav={nav}
          rightContent={rightContent}
        />
      </div>

      {/* Mobile (≤576px) */}
      <div className="pokedex-theme hidden mobile:block">
        <div className="flex min-h-screen items-start justify-center p-4 bg-background">
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
