import { fireEvent, render, screen } from '@testing-library/react';

import { usePokemonFilters } from '@/features/PokemonSearch/model';

import type { Generation, PokemonRarity } from '@/entities/Pokemon';
import type { Region } from '@/entities/Region';

import { PokemonFilters } from './PokemonFilters';

const mockSetFilters = jest.fn();
const mockResetFilters = jest.fn();
const mockSetIsPending = jest.fn();

jest.mock('@/features/PokemonSearch/model', () => ({
  usePokemonFilters: jest.fn(),
}));

jest.mock('@/views/Pokemon/lib/PendingContext', () => ({
  usePending: () => ({ isPending: false, setIsPending: mockSetIsPending }),
}));

jest.mock('./MobileFiltersModal', () => ({
  MobileFiltersModal: () => null,
}));

jest.mock('@/features/PokemonSearch', () => ({
  PokemonSearch: ({ onChange, value }: { onChange: (v: string) => void; value?: string }) => (
    <input
      data-testid="pokemon-search"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock('@/shared/ui/CustomSelect/CustomSelect', () => ({
  CustomSelect: ({
    id,
    onChange,
    placeholder,
    options,
    value,
  }: {
    id: string;
    onChange: (v: string) => void;
    placeholder: string;
    options: { value: string; label: string }[];
    value: string;
  }) => (
    <select
      data-testid={id}
      aria-label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">--</option>
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
        >
          {o.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock('@/shared/ui', () => ({
  Button: ({
    children,
    onClick,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) => (
    <button
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

const mockUsePokemonFilters = usePokemonFilters as jest.Mock;

const emptyFilters = {
  search: undefined,
  types: undefined,
  region: undefined,
  rarity: undefined,
  generation: undefined,
  evolutionStage: undefined,
};

const defaultProps = {
  regions: [{ id: 1, name: 'Kanto', generationId: 1, localizedName: 'Kanto' }] as Region[],
  types: ['fire', 'water'] as string[],
  rarities: ['common', 'rare'] as PokemonRarity[],
  generations: [{ id: 1, name: 'Generation I' }] as Generation[],
};

function setupHook(overrides: Partial<ReturnType<typeof usePokemonFilters>> = {}) {
  mockUsePokemonFilters.mockReturnValue({
    filters: emptyFilters,
    setFilters: mockSetFilters,
    resetFilters: mockResetFilters,
    isPending: false,
    ...overrides,
  });
}

describe('PokemonFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupHook();
  });

  describe('render', () => {
    it('renders the search input', () => {
      render(<PokemonFilters {...defaultProps} />);
      expect(screen.getByTestId('pokemon-search')).toBeInTheDocument();
    });

    it('renders all five filter selects', () => {
      render(<PokemonFilters {...defaultProps} />);
      expect(screen.getByTestId('regionId')).toBeInTheDocument();
      expect(screen.getByTestId('rarityId')).toBeInTheDocument();
      expect(screen.getByTestId('typeId')).toBeInTheDocument();
      expect(screen.getByTestId('generationId')).toBeInTheDocument();
      expect(screen.getByTestId('evolutionStageId')).toBeInTheDocument();
    });

    it('does not show the clear button when no filters are active', () => {
      render(<PokemonFilters {...defaultProps} />);
      expect(screen.queryByRole('button', { name: 'clear' })).not.toBeInTheDocument();
    });
  });

  describe('clear button visibility', () => {
    it.each([
      ['search', { search: 'pikachu' }],
      ['region', { region: '1' }],
      ['types', { types: 'fire' }],
      ['rarity', { rarity: 'rare' }],
      ['generation', { generation: '1' }],
      ['evolutionStage', { evolutionStage: 'base' }],
    ] as const)('shows clear button when %s is active', (_, activeFilters) => {
      setupHook({ filters: { ...emptyFilters, ...activeFilters } });
      render(<PokemonFilters {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument();
    });
  });

  describe('filter interactions', () => {
    it('calls setFilters with search value', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.change(screen.getByTestId('pokemon-search'), { target: { value: 'bulbasaur' } });
      expect(mockSetFilters).toHaveBeenCalledWith({ search: 'bulbasaur' });
    });

    it('calls setFilters with region value', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.change(screen.getByTestId('regionId'), { target: { value: '1' } });
      expect(mockSetFilters).toHaveBeenCalledWith({ region: '1' });
    });

    it('calls setFilters with rarity value', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.change(screen.getByTestId('rarityId'), { target: { value: 'rare' } });
      expect(mockSetFilters).toHaveBeenCalledWith({ rarity: 'rare' });
    });

    it('calls setFilters with type value', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.change(screen.getByTestId('typeId'), { target: { value: 'fire' } });
      expect(mockSetFilters).toHaveBeenCalledWith({ types: 'fire' });
    });

    it('calls setFilters with generation value', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.change(screen.getByTestId('generationId'), { target: { value: '1' } });
      expect(mockSetFilters).toHaveBeenCalledWith({ generation: '1' });
    });

    it('calls setFilters with evolutionStage value', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.change(screen.getByTestId('evolutionStageId'), { target: { value: 'stage1' } });
      expect(mockSetFilters).toHaveBeenCalledWith({ evolutionStage: 'stage1' });
    });
  });

  describe('reset', () => {
    it('calls resetFilters when clear button is clicked', () => {
      setupHook({ filters: { ...emptyFilters, search: 'pikachu' } });
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'clear' }));
      expect(mockResetFilters).toHaveBeenCalledTimes(1);
    });

    it('calls resetFilters exactly once per click', () => {
      setupHook({ filters: { ...emptyFilters, rarity: 'rare' } });
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: 'clear' }));
      expect(mockResetFilters).toHaveBeenCalledTimes(1);
      expect(mockSetFilters).not.toHaveBeenCalled();
    });
  });

  describe('pending state', () => {
    it('notifies context with isPending on mount', () => {
      render(<PokemonFilters {...defaultProps} />);
      expect(mockSetIsPending).toHaveBeenCalledWith(false);
    });

    it('notifies context when isPending becomes true', () => {
      const { rerender } = render(<PokemonFilters {...defaultProps} />);
      setupHook({ isPending: true });
      rerender(<PokemonFilters {...defaultProps} />);
      expect(mockSetIsPending).toHaveBeenCalledWith(true);
    });

    it('notifies context when isPending returns to false', () => {
      setupHook({ isPending: true });
      const { rerender } = render(<PokemonFilters {...defaultProps} />);
      setupHook({ isPending: false });
      rerender(<PokemonFilters {...defaultProps} />);
      expect(mockSetIsPending).toHaveBeenLastCalledWith(false);
    });
  });
});
