import { renderHook, act } from '@testing-library/react';

import { Theme, LOCAL_STORAGE_THEME_KEY } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

describe('ThemeProvider Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = 'theme-dark';
  });

  test('should initialize with DARK theme by default', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe(Theme.DARK);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  test('should initialize with theme from localStorage if it exists', () => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.DARK);

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe(Theme.DARK);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  test('toggleTheme should change theme and update localStorage/DOM', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(Theme.LIGHT);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(Theme.LIGHT);
    expect(document.body.classList.contains('dark-theme')).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(Theme.DARK);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  test('should react to localStorage changes in other tabs', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: LOCAL_STORAGE_THEME_KEY,
          newValue: Theme.DARK,
        }),
      );
    });

    expect(result.current.theme).toBe(Theme.DARK);
  });

  test('should fallback to DARK if localStorage contains invalid value', () => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, 'invalid_value');

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current.theme).toBe(Theme.DARK);
  });
});
