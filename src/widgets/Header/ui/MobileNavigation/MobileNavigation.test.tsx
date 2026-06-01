import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MobileNavigation } from './MobileNavigation';

jest.mock('@/entities/NavLinks', () => ({
  NavLinks: ({ action }: { action?: () => void }) => (
    <div
      onClick={action}
      data-testid="nav-links"
    >
      Links
    </div>
  ),
}));
jest.mock('@/features/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div>Theme</div>,
}));
jest.mock('@/shared/ui', () => ({
  BurgerButton: ({ onClick, isActive }: { onClick: () => void; isActive: boolean }) => (
    <button
      aria-label="Toggle menu"
      data-active={isActive}
      onClick={onClick}
    >
      Burger
    </button>
  ),
}));

describe('Component: MobileNavigation', () => {
  test('should open drawer on burger click', () => {
    render(<MobileNavigation />);

    fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));

    expect(screen.getByTestId('mobile-drawer')).toBeInTheDocument();
  });

  test('should mark burger as active when drawer is open', () => {
    render(<MobileNavigation />);

    const burger = screen.getByRole('button', { name: /toggle menu/i });
    expect(burger).toHaveAttribute('data-active', 'false');

    fireEvent.click(burger);
    expect(burger).toHaveAttribute('data-active', 'true');
  });

  test('should close drawer when clicking overlay', async () => {
    render(<MobileNavigation />);

    fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
    fireEvent.click(screen.getByTestId('overlay'));

    await waitFor(() => {
      expect(screen.queryByTestId('mobile-drawer')).not.toBeInTheDocument();
    });
  });

  test('should close drawer when clicking on a nav link', async () => {
    render(<MobileNavigation />);

    fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
    fireEvent.click(screen.getByTestId('nav-links'));

    await waitFor(() => {
      expect(screen.queryByTestId('mobile-drawer')).not.toBeInTheDocument();
    });
  });
});
