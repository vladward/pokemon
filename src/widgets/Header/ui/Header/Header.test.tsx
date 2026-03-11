jest.mock('@/shared/lib/hooks', () => ({
  useBreakpoints: jest.fn(),
}));

jest.mock('./Header.module.scss', () => ({}));
jest.mock('../MobileNavigation/MobileNavigation.module.scss', () => ({}));

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { useBreakpoints } from '@/shared/lib/hooks';

import { Header } from './Header';

jest.mock('../MobileNavigation/MobileNavigation', () => ({
  MobileNavigation: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

describe('Widget: Header', () => {
  const mockUseBreakpoints = useBreakpoints as jest.Mock;

  test('displays MobileNavigation on tablets/mobile phones', () => {
    mockUseBreakpoints.mockReturnValue({ tablet: true, mobile: false });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  test('should display the navigation and theme switcher in the header on the desktop', () => {
    mockUseBreakpoints.mockReturnValue({ tablet: false, mobile: false });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();

    const desktopNav = screen.getByTestId('desktop-nav');
    expect(desktopNav).toBeInTheDocument();

    const { getByRole, getByTestId: getByTestIdWithin } = within(desktopNav);

    expect(getByRole('link', { name: /pokemons/i })).toBeInTheDocument();

    expect(getByTestIdWithin('theme-switcher')).toBeInTheDocument();
  });
});
