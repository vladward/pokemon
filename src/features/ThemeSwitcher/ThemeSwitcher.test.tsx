import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from 'next-themes';

import { ThemeSwitcher } from './ThemeSwitcher';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

const mockedUseTheme = useTheme as jest.Mock;

describe('ThemeSwitcher Component Tests', () => {
  beforeEach(() => {
    mockedUseTheme.mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: jest.fn(),
    });
  });

  test('should render button when mounted', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should call setTheme with opposite theme on click', () => {
    const setTheme = jest.fn();
    mockedUseTheme.mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme,
    });

    render(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith('light');
  });

  test('should match snapshot in DARK theme', () => {
    mockedUseTheme.mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: jest.fn(),
    });

    const { asFragment } = render(<ThemeSwitcher />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should have aria-label for accessibility', () => {
    render(<ThemeSwitcher />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle theme');
  });
});
