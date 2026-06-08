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

jest.mock('@/shared/ui/MultiSelect/MultiSelect', () => ({
  MultiSelect: ({
    values,
    onChange,
    placeholder,
    options,
  }: {
    values: string[];
    onChange: (values: string[]) => void;
    placeholder: string;
    options: { value: string; label: string }[];
    disabled?: boolean;
    className?: string;
  }) => (
    <div data-testid={`multiselect-${placeholder}`}>
      {options.map((o) => (
        <button
          key={o.value}
          data-testid={`${placeholder}-${o.value}`}
          onClick={() =>
            onChange(
              values.includes(o.value)
                ? values.filter((v) => v !== o.value)
                : [...values, o.value],
            )
          }
        >
          {o.label}
        </button>
      ))}
    </div>
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
  types: undefined as string[] | undefined,
  region: undefined as string[] | undefined,
  rarity: undefined as string[] | undefined,
  generation: undefined as string[] | undefined,
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
      expect(screen.getByTestId('multiselect-region')).toBeInTheDocument();
      expect(screen.getByTestId('multiselect-rarity')).toBeInTheDocument();
      expect(screen.getByTestId('multiselect-type')).toBeInTheDocument();
      expect(screen.getByTestId('multiselect-generation')).toBeInTheDocument();
      expect(screen.getByTestId('multiselect-evo_stage')).toBeInTheDocument();
    });

    it('does not show the clear button when no filters are active', () => {
      render(<PokemonFilters {...defaultProps} />);
      expect(screen.queryByRole('button', { name: 'clear' })).not.toBeInTheDocument();
    });
  });

  describe('clear button visibility', () => {
    it.each([
      ['search', { search: 'pikachu' }],
      ['region', { region: ['1'] }],
      ['types', { types: ['fire'] }],
      ['rarity', { rarity: ['rare'] }],
      ['generation', { generation: ['1'] }],
      ['evolutionStage', { evolutionStage: ['base'] }],
    ])('shows clear button when %s is active', (_, activeFilters) => {
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

    it('calls setFilters with region as array', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('region-1'));
      expect(mockSetFilters).toHaveBeenCalledWith({ region: ['1'] });
    });

    it('calls setFilters with empty region array when deselected', () => {
      setupHook({ filters: { ...emptyFilters, region: ['1'] } });
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('region-1'));
      expect(mockSetFilters).toHaveBeenCalledWith({ region: [] });
    });

    it('calls setFilters with rarity as array', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('rarity-rare'));
      expect(mockSetFilters).toHaveBeenCalledWith({ rarity: ['rare'] });
    });

    it('calls setFilters with empty rarity array when deselected', () => {
      setupHook({ filters: { ...emptyFilters, rarity: ['rare'] } });
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('rarity-rare'));
      expect(mockSetFilters).toHaveBeenCalledWith({ rarity: [] });
    });

    it('calls setFilters with type as array', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('type-fire'));
      expect(mockSetFilters).toHaveBeenCalledWith({ types: ['fire'] });
    });

    it('calls setFilters with empty types array when deselected', () => {
      setupHook({ filters: { ...emptyFilters, types: ['fire'] } });
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('type-fire'));
      expect(mockSetFilters).toHaveBeenCalledWith({ types: [] });
    });

    it('calls setFilters with generation as array', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('generation-1'));
      expect(mockSetFilters).toHaveBeenCalledWith({ generation: ['1'] });
    });

    it('calls setFilters with evolutionStage as array', () => {
      render(<PokemonFilters {...defaultProps} />);
      fireEvent.click(screen.getByTestId('evo_stage-stage1'));
      expect(mockSetFilters).toHaveBeenCalledWith({ evolutionStage: ['stage1'] });
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
      setupHook({ filters: { ...emptyFilters, rarity: ['rare'] } });
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
