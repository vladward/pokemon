import { render, screen } from '@testing-library/react';

import { PokemonRegionsPanel } from './PokemonRegionsPanel';

describe('PokemonRegionsPanel', () => {
  it('renders nothing when locations list is empty', () => {
    const { container } = render(<PokemonRegionsPanel locations={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the Location section label when locations are provided', () => {
    render(<PokemonRegionsPanel locations={['viridian-forest', 'power-plant']} />);
    expect(screen.getByRole('region', { name: /location/i })).toBeInTheDocument();
  });

  it('renders each location as a list item', () => {
    render(<PokemonRegionsPanel locations={['viridian-forest', 'power-plant', 'cerulean-cave']} />);
    expect(screen.getByText('viridian-forest')).toBeInTheDocument();
    expect(screen.getByText('power-plant')).toBeInTheDocument();
    expect(screen.getByText('cerulean-cave')).toBeInTheDocument();
  });

  it('renders a single location without crashing', () => {
    render(<PokemonRegionsPanel locations={['pallet-town']} />);
    expect(screen.getByText('pallet-town')).toBeInTheDocument();
  });
});
