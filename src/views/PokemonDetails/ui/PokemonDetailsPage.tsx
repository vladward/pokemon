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

const normalizeKey = (k: string) => k.replace(/-/g, '_');

export async function PokemonDetailsPage({ pokemon, nav }: Props) {
  const t = await getTranslations('pages.pokemon.details');

  const safeT = (key: string, fallback: string): string => {
    try {
      return t(key as Parameters<typeof t>[0]);
    } catch {
      return fallback;
    }
  };

  const biologyLabels = {
    species: t('biology_labels.species'),
    height: t('biology_labels.height'),
    weight: t('biology_labels.weight'),
    eggGroups: t('biology_labels.egg_groups'),
    catchRate: t('biology_labels.catch_rate'),
    baseFriendship: t('biology_labels.base_friendship'),
    hatchCounter: t('biology_labels.hatch_counter'),
    shape: t('biology_labels.shape'),
    color: t('biology_labels.color'),
    habitat: t('biology_labels.habitat'),
    unitM: t('biology_labels.unit_m'),
    unitKg: t('biology_labels.unit_kg'),
    steps: t('biology_labels.steps'),
  };

  const { shape, color, habitat } = pokemon.biology;
  const shapeValue = shape ? safeT(`biology_values.shapes.${normalizeKey(shape)}`, shape) : null;
  const colorValue = color ? safeT(`biology_values.colors.${normalizeKey(color)}`, color) : null;
  const habitatValue = habitat
    ? safeT(`biology_values.habitats.${normalizeKey(habitat)}`, habitat)
    : null;

  const heroContent = (
    <div>
      <PokemonHeroDisplay
        pokemon={pokemon}
        entryLabel={t('hud.entry')}
        heightLabel={biologyLabels.height}
        weightLabel={biologyLabels.weight}
        unitM={biologyLabels.unitM}
        unitKg={biologyLabels.unitKg}
      />

      {pokemon.evolutions.length > 0 && (
        <PokemonEvolutionPanel
          label={t('hud.evolution')}
          evolutions={pokemon.evolutions}
          evolutionSteps={pokemon.evolutionSteps}
          triggerLabels={{
            level_up: t('evolution_triggers.level_up'),
            item: t('evolution_triggers.item'),
            trade: t('evolution_triggers.trade'),
            shed: t('evolution_triggers.shed'),
            other: t('evolution_triggers.other'),
          }}
          scrollHint={t('scroll_hint')}
        />
      )}
    </div>
  );

  const statsPanel = (
    <PokemonStatsPanel
      label={t('hud.status')}
      stats={pokemon.stats}
      statLabels={{
        hp: t('stats.hp'),
        attack: t('stats.attack'),
        defense: t('stats.defense'),
        specialAttack: t('stats.special_attack'),
        specialDefense: t('stats.special_defense'),
        speed: t('stats.speed'),
      }}
      totalLabel={t('stats.total')}
    />
  );
  const abilitiesPanel = (
    <PokemonAbilitiesPanel
      label={t('hud.abilities')}
      abilities={pokemon.abilities}
      hiddenAbilityLabel={t('hidden_ability')}
    />
  );
  const biologyPanel = (
    <PokemonBiologyPanel
      label={t('hud.biology')}
      biology={pokemon.biology}
      labels={biologyLabels}
      shapeValue={shapeValue}
      colorValue={colorValue}
      habitatValue={habitatValue}
    />
  );
  const regionsPanel =
    pokemon.locations.length > 0 ? (
      <PokemonRegionsPanel
        label={t('hud.location')}
        locations={pokemon.locations}
      />
    ) : null;
  const formsPanel =
    pokemon.forms.length > 1 ? (
      <PokemonFormsPanel
        label={t('hud.forms')}
        forms={pokemon.forms}
      />
    ) : null;

  const mobileModules = [statsPanel, abilitiesPanel, biologyPanel, regionsPanel, formsPanel].filter(
    Boolean,
  ) as React.ReactNode[];

  const rightContent = (
    <div className="relative wide:h-full laptop:h-auto">
      {/* Fade indicator at the bottom when content overflows — only when right panel scrolls */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-8 hidden wide:block laptop:hidden"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--pdx-screen-bg-0))' }}
      />
      <div className="grid wide:h-full content-start grid-cols-2 gap-3 wide:overflow-y-auto p-4 tablet:grid-cols-1 laptop:h-auto laptop:overflow-y-visible">
        {statsPanel}
        {abilitiesPanel}
        <div className={!regionsPanel ? 'col-span-2' : undefined}>{biologyPanel}</div>
        {regionsPanel}
        {formsPanel && <div className="col-span-2">{formsPanel}</div>}
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
        <div className="flex min-h-screen items-start justify-center p-4 mb-4 bg-background">
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
