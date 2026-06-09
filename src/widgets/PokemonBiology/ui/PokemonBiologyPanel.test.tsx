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

describe('PokemonBiologyPanel', () => {
  it('renders the Biological Info section label', () => {
    render(<PokemonBiologyPanel biology={makeBiology()} />);
    expect(screen.getByRole('region', { name: /biological info/i })).toBeInTheDocument();
  });

  it('converts height from decimetres to metres', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ height: 4 })} />);
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
  });

  it('converts weight from hectograms to kilograms', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ weight: 60 })} />);
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
  });

  it('renders genus as Species row', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ genus: 'Mouse Pokémon' })} />);
    expect(screen.getByText('Species')).toBeInTheDocument();
    expect(screen.getByText('Mouse Pokémon')).toBeInTheDocument();
  });

  it('hides Species row when genus is null', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ genus: null })} />);
    expect(screen.queryByText('Species')).not.toBeInTheDocument();
  });

  it('renders egg groups joined by comma', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ eggGroups: ['Field', 'Fairy'] })} />);
    expect(screen.getByText('Field, Fairy')).toBeInTheDocument();
  });

  it('hides Egg Groups row when array is empty', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ eggGroups: [] })} />);
    expect(screen.queryByText('Egg Groups')).not.toBeInTheDocument();
  });

  it('renders hatch counter as step count', () => {
    // (10 + 1) * 255 = 2805
    render(<PokemonBiologyPanel biology={makeBiology({ hatchCounter: 10 })} />);
    expect(screen.getByText('2805 steps')).toBeInTheDocument();
  });

  it('hides Hatch Counter row when null', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ hatchCounter: null })} />);
    expect(screen.queryByText('Hatch Counter')).not.toBeInTheDocument();
  });

  it('hides Catch Rate row when null', () => {
    render(<PokemonBiologyPanel biology={makeBiology({ catchRate: null })} />);
    expect(screen.queryByText('Catch Rate')).not.toBeInTheDocument();
  });

  it('renders all optional fields when present', () => {
    render(<PokemonBiologyPanel biology={makeBiology()} />);
    expect(screen.getByText('Shape')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Habitat')).toBeInTheDocument();
  });
});
