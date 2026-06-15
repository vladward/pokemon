import { render, screen } from '@testing-library/react';

import type { TPokemonDetails } from '@/entities/Pokemon';

import { PokemonHeroDisplay } from './PokemonHeroDisplay';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img
      src={src}
      alt={alt}
    />
  ),
}));

const makePokemon = (overrides: Partial<TPokemonDetails> = {}): TPokemonDetails => ({
  id: 25,
  name: 'pikachu',
  types: ['electric'],
  sprite: 'https://sprites/front.png',
  spriteArtwork: 'https://sprites/artwork.png',
  spriteDreamWorld: null,
  generation: 1,
  region: 'kanto',
  rarity: 'common',
  evolutionStage: 'stage1',
  flavorText:
    'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
  stats: { hp: 35, attack: 55, defense: 40, specialAttack: 50, specialDefense: 50, speed: 90 },
  abilities: [],
  biology: {
    genus: 'Mouse Pokémon',
    height: 4,
    weight: 60,
    eggGroups: [],
    catchRate: 190,
    baseHappiness: 70,
    hatchCounter: 10,
    shape: 'upright',
    color: 'yellow',
    habitat: 'forest',
  },
  evolutions: [],
  evolutionSteps: [],
  locations: [],
  forms: [],
  ...overrides,
});

describe('PokemonHeroDisplay', () => {
  it('renders the pokemon name', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon()} />);
    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('renders the padded dex number', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon({ id: 7 })} />);
    expect(screen.getByText('No. 007')).toBeInTheDocument();
  });

  it('renders the genus when present', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon()} />);
    expect(screen.getByText('Mouse Pokémon')).toBeInTheDocument();
  });

  it('does not render genus row when genus is null', () => {
    render(
      <PokemonHeroDisplay
        pokemon={makePokemon({ biology: { ...makePokemon().biology, genus: null } })}
      />,
    );
    expect(screen.queryByText('Mouse Pokémon')).not.toBeInTheDocument();
  });

  it('renders type badges for each type', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon({ types: ['fire', 'flying'] })} />);
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
    expect(screen.getByText(/flying/i)).toBeInTheDocument();
  });

  it('renders sprite image with correct alt text when artwork is available', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon()} />);
    expect(screen.getByAltText('pikachu')).toBeInTheDocument();
  });

  it('prefers spriteArtwork over sprite', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon()} />);
    const img = screen.getByAltText('pikachu') as HTMLImageElement;
    expect(img.src).toContain('artwork.png');
  });

  it('falls back to sprite when spriteArtwork is null', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon({ spriteArtwork: null })} />);
    const img = screen.getByAltText('pikachu') as HTMLImageElement;
    expect(img.src).toContain('front.png');
  });

  it('renders fallback placeholder when both sprites are null', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon({ sprite: null, spriteArtwork: null })} />);
    expect(screen.queryByAltText('pikachu')).not.toBeInTheDocument();
  });

  it('renders the flavor text entry', () => {
    render(<PokemonHeroDisplay pokemon={makePokemon()} />);
    const entry = document.querySelector('p');
    expect(entry?.textContent).toMatch(/lightning storms/i);
  });
});
