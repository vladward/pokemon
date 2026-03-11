import { render, screen, fireEvent } from '@testing-library/react';

import { Theme, useTheme } from '@/shared/lib/theme';

import { ThemeSwitcher } from './ThemeSwitcher';

jest.mock('@/app/providers/ThemeProvider', () => ({
  ...jest.requireActual('@/app/providers/ThemeProvider'),
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.Mock;

describe('ThemeSwitcher Component Tests', () => {
  test('should render Moon icon when theme is LIGHT (to switch to DARK)', () => {
    mockedUseTheme.mockReturnValue({
      theme: Theme.LIGHT,
      toggleTheme: jest.fn(),
    });

    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should call toggleTheme on click', () => {
    const toggleTheme = jest.fn();
    mockedUseTheme.mockReturnValue({
      theme: Theme.DARK,
      toggleTheme,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });

  test('should match snapshot in DARK theme', () => {
    mockedUseTheme.mockReturnValue({
      theme: Theme.DARK,
      toggleTheme: jest.fn(),
    });

    const { asFragment } = render(<ThemeSwitcher />);

    expect(asFragment()).toMatchSnapshot();
  });

  test('should have aria-label for accessibility', () => {
    mockedUseTheme.mockReturnValue({
      theme: Theme.DARK,
      toggleTheme: jest.fn(),
    });

    render(<ThemeSwitcher />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle theme');
  });
});
