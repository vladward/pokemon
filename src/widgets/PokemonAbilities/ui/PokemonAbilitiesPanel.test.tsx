import { render, screen } from '@testing-library/react';

import type { TAbility } from '@/entities/Pokemon';

import { PokemonAbilitiesPanel } from './PokemonAbilitiesPanel';

const makeAbility = (overrides: Partial<TAbility>): TAbility => ({
  id: 1,
  name: 'static',
  isHidden: false,
  shortEffect: 'May paralyze on contact.',
  ...overrides,
});

describe('PokemonAbilitiesPanel', () => {
  it('renders the Abilities section label', () => {
    render(<PokemonAbilitiesPanel abilities={[makeAbility({})]} />);
    expect(screen.getByRole('region', { name: /abilities/i })).toBeInTheDocument();
  });

  it('renders regular ability names', () => {
    const abilities = [
      makeAbility({ id: 1, name: 'static' }),
      makeAbility({ id: 2, name: 'lightning rod' }),
    ];
    render(<PokemonAbilitiesPanel abilities={abilities} />);
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning rod')).toBeInTheDocument();
  });

  it('renders ability short effect when present', () => {
    render(
      <PokemonAbilitiesPanel
        abilities={[makeAbility({ shortEffect: 'May paralyze on contact.' })]}
      />,
    );
    expect(screen.getByText('May paralyze on contact.')).toBeInTheDocument();
  });

  it('does not render short effect when null', () => {
    render(<PokemonAbilitiesPanel abilities={[makeAbility({ shortEffect: null })]} />);
    expect(screen.queryByText('May paralyze on contact.')).not.toBeInTheDocument();
  });

  it('renders hidden ability with "Hidden Ability" label', () => {
    const hidden = makeAbility({ id: 3, name: 'lightning rod', isHidden: true });
    render(<PokemonAbilitiesPanel abilities={[hidden]} />);
    expect(screen.getByText(/hidden ability/i)).toBeInTheDocument();
    expect(screen.getByText('lightning rod')).toBeInTheDocument();
  });

  it('separates regular and hidden abilities', () => {
    const abilities = [
      makeAbility({ id: 1, name: 'static', isHidden: false }),
      makeAbility({ id: 2, name: 'lightning rod', isHidden: true }),
    ];
    render(<PokemonAbilitiesPanel abilities={abilities} />);
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning rod')).toBeInTheDocument();
    expect(screen.getByText(/hidden ability/i)).toBeInTheDocument();
  });

  it('renders nothing for hidden ability label when none exist', () => {
    render(<PokemonAbilitiesPanel abilities={[makeAbility({ isHidden: false })]} />);
    expect(screen.queryByText(/hidden ability/i)).not.toBeInTheDocument();
  });
});
