import { render, screen, fireEvent } from '@testing-library/react';

import { MobileNavigation } from './MobileNavigation';

jest.mock('@/widgets/Header', () => ({
  NavLinks: ({ callback }: { callback: () => void }) => (
    <div
      onClick={callback}
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
  BurgerButton: ({ onClick }: { onClick: () => void }) => (
    <button
      aria-label="Toggle menu"
      onClick={onClick}
    >
      Burger
    </button>
  ),
}));

describe('Component: MobileNavigation', () => {
  const props = {
    isOpen: true,
    onToggle: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = '';
  });

  test('should block the scroll when opening and remove it when closing', () => {
    const { unmount } = render(<MobileNavigation {...props} />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  test('should call onClose when clicking on the overlay or links', () => {
    render(<MobileNavigation {...props} />);

    fireEvent.click(screen.getByTestId('nav-links'));
    expect(props.onClose).toHaveBeenCalledTimes(1);

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(props.onClose).toHaveBeenCalledTimes(2);
  });
});
