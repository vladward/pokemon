import { render, screen } from '@testing-library/react';

import type { PokemonCard } from '@/entities/Pokemon';

import { PokemonCardList } from './PokemonCardList';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('@/entities/Pokemon/ui/PokemonCard', () => ({
  PokemonCard: ({ pokemon }: { pokemon: PokemonCard }) => (
    <div
      data-testid="pokemon-card"
      data-id={pokemon.id}
    >
      {pokemon.name}
    </div>
  ),
}));

const makePokemon = (overrides?: Partial<PokemonCard>): PokemonCard => ({
  id: 1,
  name: 'bulbasaur',
  types: ['grass'],
  sprite: null,
  spriteArtwork: null,
  spriteDreamWorld: null,
  generation: 1,
  region: 'kanto',
  rarity: 'common',
  evolutionStage: 'base',
  stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
  ...overrides,
});

const KANTO_STARTERS = [
  makePokemon({ id: 1, name: 'bulbasaur' }),
  makePokemon({ id: 4, name: 'charmander' }),
  makePokemon({ id: 7, name: 'squirtle' }),
];

describe('PokemonCardList', () => {
  it('renders each pokemon as a card with correct data and order', () => {
    render(<PokemonCardList items={KANTO_STARTERS} />);
    const cards = screen.getAllByTestId('pokemon-card');
    expect(cards).toHaveLength(KANTO_STARTERS.length);
    KANTO_STARTERS.forEach((pokemon, i) => {
      expect(cards[i]).toHaveTextContent(pokemon.name);
      expect(cards[i]).toHaveAttribute('data-id', String(pokemon.id));
    });
  });

  it('wraps each card in a link to the pokemon detail page', () => {
    render(<PokemonCardList items={KANTO_STARTERS} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(KANTO_STARTERS.length);
    KANTO_STARTERS.forEach((pokemon, i) => {
      expect(links[i]).toHaveAttribute('href', `/pokemon/${pokemon.id}`);
    });
  });

  it('shows empty placeholder and no cards when list is empty', () => {
    render(<PokemonCardList items={[]} />);
    expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
    expect(screen.queryByTestId('pokemon-card')).not.toBeInTheDocument();
  });
});
