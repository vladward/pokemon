jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('@/shared/config/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a
      href={href}
      {...props}
    >
      {children}
    </a>
  ),
  usePathname: jest.fn(() => '/'),
  useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn() })),
  routing: { locales: ['en', 'ru', 'de', 'es', 'fr'] },
}));

jest.mock('@/widgets/NavLinks', () => ({
  /* eslint-disable @next/next/no-html-link-for-pages */
  NavLinks: () => (
    <nav>
      <a href="/pokemon">Pokemon</a>
      <a href="/skills">Skills</a>
      <a href="/items">Items</a>
      <a href="/game">Game</a>
    </nav>
  ),
  /* eslint-enable @next/next/no-html-link-for-pages */
}));

import { render, screen, within } from '@testing-library/react';

import { Header } from './Header';

jest.mock('../MobileNavigation/MobileNavigation', () => ({
  MobileNavigation: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

describe('Widget: Header', () => {
  test('renders both mobile and desktop nav in DOM', () => {
    render(<Header />);

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
  });

  test('desktop nav contains navigation links and theme switcher', () => {
    render(<Header />);

    const desktopNav = screen.getByTestId('desktop-nav');
    const { getByRole, getByTestId: getByTestIdWithin } = within(desktopNav);

    expect(getByRole('link', { name: /pokemon/i })).toBeInTheDocument();
    expect(getByTestIdWithin('theme-switcher')).toBeInTheDocument();
  });
});
