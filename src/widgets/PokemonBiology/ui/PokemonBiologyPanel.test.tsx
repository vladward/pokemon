import { render, screen } from '@testing-library/react';

import type { TBiology } from '@/entities/Pokemon';

import { PokemonBiologyPanel } from './PokemonBiologyPanel';

const makeBiology = (overrides: Partial<TBiology> = {}): TBiology => ({
  genus: 'Mouse Pokémon',
  height: 4,
  weight: 60,
  eggGroups: ['Field', 'Fairy'],
  catchRate: 190,
  baseHappiness: 70,
  hatchCounter: 10,
  shape: 'upright',
  color: 'yellow',
  habitat: 'forest',
  ...overrides,
});

const BIOLOGY_LABELS = {
  species: 'Species',
  height: 'Height',
  weight: 'Weight',
  eggGroups: 'Egg Groups',
  catchRate: 'Catch Rate',
  baseFriendship: 'Base Friendship',
  hatchCounter: 'Hatch Counter',
  shape: 'Shape',
  color: 'Color',
  habitat: 'Habitat',
  unitM: 'm',
  unitKg: 'kg',
  steps: 'steps',
};

const defaultProps = {
  labels: BIOLOGY_LABELS,
  shapeValue: 'upright' as string | null,
  colorValue: 'yellow' as string | null,
  habitatValue: 'forest' as string | null,
};

describe('PokemonBiologyPanel', () => {
  it('renders the Biological Info section label', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology()}
        {...defaultProps}
      />,
    );
    expect(screen.getByRole('region', { name: /biological info/i })).toBeInTheDocument();
  });

  it('converts height from decimetres to metres', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ height: 4 })}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
  });

  it('converts weight from hectograms to kilograms', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ weight: 60 })}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
  });

  it('renders genus as Species row', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ genus: 'Mouse Pokémon' })}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Mouse Pokémon')).toBeInTheDocument();
  });

  it('hides Species row when genus is null', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ genus: null })}
        {...defaultProps}
      />,
    );
    expect(screen.queryByText('Species')).not.toBeInTheDocument();
  });

  it('renders egg groups joined by comma', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ eggGroups: ['Field', 'Fairy'] })}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('Field, Fairy')).toBeInTheDocument();
  });

  it('hides Egg Groups row when array is empty', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ eggGroups: [] })}
        {...defaultProps}
      />,
    );
    expect(screen.queryByText('Egg Groups')).not.toBeInTheDocument();
  });

  it('renders hatch counter as step count', () => {
    // (10 + 1) * 255 = 2805
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ hatchCounter: 10 })}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('2805 steps')).toBeInTheDocument();
  });

  it('hides Hatch Counter row when null', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ hatchCounter: null })}
        {...defaultProps}
      />,
    );
    expect(screen.queryByText('Hatch Counter')).not.toBeInTheDocument();
  });

  it('hides Catch Rate row when null', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology({ catchRate: null })}
        {...defaultProps}
      />,
    );
    expect(screen.queryByText('Catch Rate')).not.toBeInTheDocument();
  });

  it('renders all optional fields when present', () => {
    render(
      <PokemonBiologyPanel
        biology={makeBiology()}
        {...defaultProps}
      />,
    );
    expect(screen.getByText('Shape')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Habitat')).toBeInTheDocument();
  });
});
