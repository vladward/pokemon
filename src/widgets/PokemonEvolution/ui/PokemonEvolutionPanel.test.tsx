import { render, screen } from '@testing-library/react';

import type { TEvolutionNode, TEvolutionStep } from '@/entities/Pokemon';

import { PokemonEvolutionPanel } from './PokemonEvolutionPanel';

const makeNode = (speciesId: number, name: string, isCurrent = false): TEvolutionNode => ({
  speciesId,
  pokemonId: speciesId,
  name,
  sprite: null,
  isCurrent,
});

const makeStep = (
  fromSpeciesId: number,
  toSpeciesId: number,
  minLevel: number | null = null,
): TEvolutionStep => ({
  fromSpeciesId,
  toSpeciesId,
  trigger: 'level-up',
  minLevel,
});

describe('PokemonEvolutionPanel', () => {
  it('renders nothing when evolution list is empty', () => {
    const { container } = render(
      <PokemonEvolutionPanel
        evolutions={[]}
        evolutionSteps={[]}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a single-stage pokemon with no arrows', () => {
    render(
      <PokemonEvolutionPanel
        evolutions={[makeNode(132, 'ditto', true)]}
        evolutionSteps={[]}
      />,
    );
    expect(screen.getByText('ditto')).toBeInTheDocument();
  });

  it('renders a linear three-stage chain in order', () => {
    const nodes = [makeNode(1, 'bulbasaur'), makeNode(2, 'ivysaur'), makeNode(3, 'venusaur', true)];
    const steps = [makeStep(1, 2, 16), makeStep(2, 3, 32)];
    render(
      <PokemonEvolutionPanel
        evolutions={nodes}
        evolutionSteps={steps}
      />,
    );
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
    expect(screen.getByText('venusaur')).toBeInTheDocument();
  });

  it('shows level labels on arrows in a linear chain', () => {
    const nodes = [makeNode(1, 'bulbasaur'), makeNode(2, 'ivysaur')];
    const steps = [makeStep(1, 2, 16)];
    render(
      <PokemonEvolutionPanel
        evolutions={nodes}
        evolutionSteps={steps}
      />,
    );
    expect(screen.getByText(/lv\.\s*16/i)).toBeInTheDocument();
  });

  it('does not show the scroll indicator for a linear chain', () => {
    const nodes = [makeNode(25, 'pichu'), makeNode(26, 'pikachu', true), makeNode(27, 'raichu')];
    const steps = [makeStep(25, 26), makeStep(26, 27)];
    render(
      <PokemonEvolutionPanel
        evolutions={nodes}
        evolutionSteps={steps}
      />,
    );
    expect(screen.queryByText(/scroll/i)).not.toBeInTheDocument();
  });

  it('shows the scroll indicator for a branching chain', () => {
    // Eevee → Vaporeon, Jolteon (simplified 2-branch)
    const nodes = [
      makeNode(133, 'eevee', true),
      makeNode(134, 'vaporeon'),
      makeNode(135, 'jolteon'),
    ];
    const steps = [makeStep(133, 134), makeStep(133, 135)];
    render(
      <PokemonEvolutionPanel
        evolutions={nodes}
        evolutionSteps={steps}
      />,
    );
    expect(screen.getByText(/scroll/i)).toBeInTheDocument();
  });

  it('renders all branch targets in a branching chain', () => {
    const nodes = [
      makeNode(133, 'eevee', true),
      makeNode(134, 'vaporeon'),
      makeNode(135, 'jolteon'),
    ];
    const steps = [makeStep(133, 134), makeStep(133, 135)];
    render(
      <PokemonEvolutionPanel
        evolutions={nodes}
        evolutionSteps={steps}
      />,
    );
    expect(screen.getByText('eevee')).toBeInTheDocument();
    expect(screen.getByText('vaporeon')).toBeInTheDocument();
    expect(screen.getByText('jolteon')).toBeInTheDocument();
  });

  it('renders the Evolution Chain section label', () => {
    const nodes = [makeNode(1, 'bulbasaur', true)];
    render(
      <PokemonEvolutionPanel
        evolutions={nodes}
        evolutionSteps={[]}
      />,
    );
    expect(screen.getByRole('region', { name: /evolution chain/i })).toBeInTheDocument();
  });
});
