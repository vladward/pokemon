import { render, screen } from '@testing-library/react';

import type { TForm } from '@/entities/Pokemon';

import { PokemonFormsPanel } from './PokemonFormsPanel';

const makeForm = (pokemonId: number, name: string, isCurrent = false): TForm => ({
  pokemonId,
  name,
  sprite: null,
  isCurrent,
});

describe('PokemonFormsPanel', () => {
  it('renders nothing when forms list is empty', () => {
    const { container } = render(<PokemonFormsPanel forms={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when there is only one form', () => {
    const { container } = render(<PokemonFormsPanel forms={[makeForm(25, 'pikachu', true)]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the Forms section when multiple forms exist', () => {
    const forms = [makeForm(25, 'pikachu', true), makeForm(10080, 'pikachu-alola'), makeForm(10094, 'pikachu-original')];
    render(<PokemonFormsPanel forms={forms} />);
    expect(screen.getByRole('region', { name: /forms/i })).toBeInTheDocument();
  });

  it('renders each form name', () => {
    const forms = [makeForm(25, 'pikachu', true), makeForm(10080, 'pikachu-alola'), makeForm(10094, 'pikachu-original')];
    render(<PokemonFormsPanel forms={forms} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('pikachu-alola')).toBeInTheDocument();
    expect(screen.getByText('pikachu-original')).toBeInTheDocument();
  });
});
