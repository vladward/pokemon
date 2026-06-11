import { render, screen } from '@testing-library/react';

import { PokemonStatsPanel } from './PokemonStatsPanel';

const BASE_STATS = {
  hp: 45,
  attack: 49,
  defense: 49,
  specialAttack: 65,
  specialDefense: 65,
  speed: 45,
};

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  specialAttack: 'Sp. Atk',
  specialDefense: 'Sp. Def',
  speed: 'Speed',
};

describe('PokemonStatsPanel', () => {
  it('renders all six stat labels', () => {
    render(<PokemonStatsPanel stats={BASE_STATS} statLabels={STAT_LABELS} totalLabel="Total" />);
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Sp. Atk')).toBeInTheDocument();
    expect(screen.getByText('Sp. Def')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });

  it('renders the correct value for each stat', () => {
    render(<PokemonStatsPanel stats={BASE_STATS} statLabels={STAT_LABELS} totalLabel="Total" />);
    // 45 appears for HP and Speed; 65 appears for Sp. Atk and Sp. Def
    expect(screen.getAllByText('45', { selector: '[class*="tabular"]' })).toHaveLength(2);
    expect(screen.getAllByText('65', { selector: '[class*="tabular"]' })).toHaveLength(2);
    expect(screen.getAllByText('49', { selector: '[class*="tabular"]' })).toHaveLength(2);
  });

  it('computes and displays the correct total', () => {
    render(<PokemonStatsPanel stats={BASE_STATS} statLabels={STAT_LABELS} totalLabel="Total" />);
    const expectedTotal = Object.values(BASE_STATS).reduce((s, v) => s + v, 0);
    expect(screen.getByText(String(expectedTotal))).toBeInTheDocument();
  });

  it('recalculates total correctly for different stat distributions', () => {
    const highStats = { hp: 255, attack: 255, defense: 255, specialAttack: 255, specialDefense: 255, speed: 255 };
    render(<PokemonStatsPanel stats={highStats} statLabels={STAT_LABELS} totalLabel="Total" />);
    expect(screen.getByText('1530')).toBeInTheDocument();
  });

  it('renders the Status section heading', () => {
    render(<PokemonStatsPanel stats={BASE_STATS} statLabels={STAT_LABELS} totalLabel="Total" />);
    expect(screen.getByRole('region', { name: /status/i })).toBeInTheDocument();
  });
});
