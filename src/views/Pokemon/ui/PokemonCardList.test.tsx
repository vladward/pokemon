import { render, screen } from '@testing-library/react';
import type { ComponentType } from 'react';

import type { PokemonCard } from '@/entities/Pokemon';

import { PokemonCardList } from './PokemonCardList';

jest.mock('./PokemonLoader', () => ({
  PokemonLoader: () => <div data-testid="pokemon-loader" />,
}));

const MockCard: ComponentType<{ pokemon: PokemonCard }> = ({ pokemon }) => (
  <div
    data-testid="pokemon-card"
    data-id={pokemon.id}
  >
    {pokemon.name}
  </div>
);

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
  describe('card rendering', () => {
    it('renders a card for each pokemon', () => {
      render(
        <PokemonCardList
          items={KANTO_STARTERS}
          CardComponent={MockCard}
        />,
      );
      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(3);
    });

    it('renders all pokemon names', () => {
      render(
        <PokemonCardList
          items={KANTO_STARTERS}
          CardComponent={MockCard}
        />,
      );
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
      expect(screen.getByText('squirtle')).toBeInTheDocument();
    });

    it('preserves pokemon order', () => {
      render(
        <PokemonCardList
          items={KANTO_STARTERS}
          CardComponent={MockCard}
        />,
      );
      const cards = screen.getAllByTestId('pokemon-card');
      expect(cards[0]).toHaveTextContent('bulbasaur');
      expect(cards[1]).toHaveTextContent('charmander');
      expect(cards[2]).toHaveTextContent('squirtle');
    });

    it('renders exactly N cards for N pokemon', () => {
      const items = Array.from({ length: 20 }, (_, i) =>
        makePokemon({ id: i + 1, name: `pokemon-${i + 1}` }),
      );
      render(
        <PokemonCardList
          items={items}
          CardComponent={MockCard}
        />,
      );
      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(20);
    });

    it('renders a single card', () => {
      render(
        <PokemonCardList
          items={[makePokemon()]}
          CardComponent={MockCard}
        />,
      );
      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(1);
    });

    it('passes pokemon data to the card component', () => {
      const item = makePokemon({ id: 25, name: 'pikachu' });
      render(
        <PokemonCardList
          items={[item]}
          CardComponent={MockCard}
        />,
      );
      expect(screen.getByTestId('pokemon-card')).toHaveAttribute('data-id', '25');
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('shows placeholder when list is empty', () => {
      render(
        <PokemonCardList
          items={[]}
          CardComponent={MockCard}
        />,
      );
      expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
    });

    it('shows placeholder when isPending is explicitly false', () => {
      render(
        <PokemonCardList
          items={[]}
          CardComponent={MockCard}
          isPending={false}
        />,
      );
      expect(screen.getByText('No Pokémon found')).toBeInTheDocument();
    });

    it('does not show cards in empty state', () => {
      render(
        <PokemonCardList
          items={[]}
          CardComponent={MockCard}
        />,
      );
      expect(screen.queryByTestId('pokemon-card')).not.toBeInTheDocument();
    });

    it('does not show placeholder when loading', () => {
      render(
        <PokemonCardList
          items={[]}
          CardComponent={MockCard}
          isPending
        />,
      );
      expect(screen.queryByText('No Pokémon found')).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows loader when isPending and list is empty', () => {
      render(
        <PokemonCardList
          items={[]}
          CardComponent={MockCard}
          isPending
        />,
      );
      expect(screen.getByTestId('pokemon-loader')).toBeInTheDocument();
    });

    it('does not show loader when cards exist (dimmed externally)', () => {
      render(
        <PokemonCardList
          items={KANTO_STARTERS}
          CardComponent={MockCard}
          isPending
        />,
      );
      expect(screen.queryByTestId('pokemon-loader')).not.toBeInTheDocument();
    });

    it('does not show loader when list is empty and loading is done', () => {
      render(
        <PokemonCardList
          items={[]}
          CardComponent={MockCard}
          isPending={false}
        />,
      );
      expect(screen.queryByTestId('pokemon-loader')).not.toBeInTheDocument();
    });

    it('shows cards when isPending if they exist', () => {
      render(
        <PokemonCardList
          items={KANTO_STARTERS}
          CardComponent={MockCard}
          isPending
        />,
      );
      expect(screen.getAllByTestId('pokemon-card')).toHaveLength(3);
    });
  });
});
