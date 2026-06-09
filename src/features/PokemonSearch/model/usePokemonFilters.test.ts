import { act, renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';

import { usePokemonFilters } from './usePokemonFilters';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;

const makeSearchParams = (params: Record<string, string> = {}) => {
  const sp = new URLSearchParams(params);
  return { get: (k: string) => sp.get(k), toString: () => sp.toString() };
};

const getCalledParams = (callIndex = 0) =>
  new URLSearchParams((mockPush.mock.calls[callIndex][0] as string).slice(1));

describe('usePokemonFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchParams.mockReturnValue(makeSearchParams());
  });

  describe('reading filters from URL', () => {
    it('returns empty filters when URL has no params', () => {
      const { result } = renderHook(() => usePokemonFilters());

      expect(result.current.filters).toEqual({
        search: undefined,
        types: undefined,
        region: undefined,
        rarity: undefined,
        generation: undefined,
        evolutionStage: undefined,
      });
    });

    it('parses single-value array filters from URL', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({ types: 'fire', rarity: 'rare', region: '1', generation: '2' }),
      );

      const { result } = renderHook(() => usePokemonFilters());

      expect(result.current.filters.types).toEqual(['fire']);
      expect(result.current.filters.rarity).toEqual(['rare']);
      expect(result.current.filters.region).toEqual(['1']);
      expect(result.current.filters.generation).toEqual(['2']);
    });

    it('parses comma-separated values from URL', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({
          types: 'fire,water',
          rarity: 'rare,legendary',
          region: '1,2',
          generation: '1,3',
        }),
      );

      const { result } = renderHook(() => usePokemonFilters());

      expect(result.current.filters.types).toEqual(['fire', 'water']);
      expect(result.current.filters.rarity).toEqual(['rare', 'legendary']);
      expect(result.current.filters.region).toEqual(['1', '2']);
      expect(result.current.filters.generation).toEqual(['1', '3']);
    });

    it('reads scalar filters from URL', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({ search: 'pikachu', evolutionStage: 'base' }),
      );

      const { result } = renderHook(() => usePokemonFilters());

      expect(result.current.filters.search).toBe('pikachu');
      expect(result.current.filters.evolutionStage).toEqual(['base']);
    });
  });

  describe('setFilters', () => {
    it('adds search to URL', () => {
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ search: 'bulbasaur' }));

      expect(mockPush).toHaveBeenCalledWith('?search=bulbasaur');
    });

    it('serializes array filters as comma-separated in URL', () => {
      const { result } = renderHook(() => usePokemonFilters());

      act(() =>
        result.current.setFilters({
          types: ['fire', 'water'],
          rarity: ['rare', 'legendary'],
          region: ['1', '2'],
          generation: ['1', '3'],
        }),
      );

      const params = getCalledParams();
      expect(params.get('types')).toBe('fire,water');
      expect(params.get('rarity')).toBe('rare,legendary');
      expect(params.get('region')).toBe('1,2');
      expect(params.get('generation')).toBe('1,3');
    });

    it('sets multiple filters simultaneously', () => {
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ search: 'char', types: ['fire'], rarity: ['rare'] }));

      const params = getCalledParams();
      expect(params.get('search')).toBe('char');
      expect(params.get('types')).toBe('fire');
      expect(params.get('rarity')).toBe('rare');
    });

    it('empty array removes the param', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ types: 'fire' }));
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ types: [] }));

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('empty array removes evolutionStage param', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ evolutionStage: 'base' }));
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ evolutionStage: [] }));

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('undefined does not touch an existing param', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ types: 'fire', region: '1' }));
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ search: undefined, region: [] }));

      const params = getCalledParams();
      expect(params.get('types')).toBe('fire');
      expect(params.get('region')).toBeNull();
      expect(params.get('search')).toBeNull();
    });

    it('preserves remaining params when changing one', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ types: 'fire', region: '1' }));
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ search: 'char' }));

      const params = getCalledParams();
      expect(params.get('types')).toBe('fire');
      expect(params.get('region')).toBe('1');
      expect(params.get('search')).toBe('char');
    });

    it('resets page when a filter changes', () => {
      mockUseSearchParams.mockReturnValue(makeSearchParams({ page: '3', types: 'fire' }));
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ rarity: ['rare'] }));

      const params = getCalledParams();
      expect(params.get('page')).toBeNull();
      expect(params.get('types')).toBe('fire');
      expect(params.get('rarity')).toBe('rare');
    });

    it('sets evolutionStage as array', () => {
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ evolutionStage: ['stage1'] }));

      expect(mockPush).toHaveBeenCalledWith('?evolutionStage=stage1');
    });

    it('removes one filter while keeping the rest', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({ types: 'fire', region: '1', rarity: 'rare' }),
      );
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.setFilters({ region: [] }));

      const params = getCalledParams();
      expect(params.get('region')).toBeNull();
      expect(params.get('types')).toBe('fire');
      expect(params.get('rarity')).toBe('rare');
    });
  });

  describe('resetFilters', () => {
    it('resets all params', () => {
      mockUseSearchParams.mockReturnValue(
        makeSearchParams({ search: 'pikachu', types: 'fire', region: '1', page: '5' }),
      );
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.resetFilters());

      expect(mockPush).toHaveBeenCalledWith('?');
    });

    it('calls router.push exactly once', () => {
      const { result } = renderHook(() => usePokemonFilters());

      act(() => result.current.resetFilters());

      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  });
});
