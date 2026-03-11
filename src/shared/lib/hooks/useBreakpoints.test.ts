jest.mock('@/shared/styles/_breakpoints.module.scss', () => ({
  mobile: '576px',
  tablet: '768px',
  laptop: '992px',
  desktop: '1200px',
  wide: '1400px',
}));

import { renderHook } from '@testing-library/react';

import { useBreakpoints } from './useBreakpoints';

describe('useBreakpoints Hook', () => {
  test('should return the initial state of breakpoints', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useBreakpoints());

    expect(result.current).toHaveProperty('tablet');
    expect(typeof result.current.tablet).toBe('boolean');
  });
});
