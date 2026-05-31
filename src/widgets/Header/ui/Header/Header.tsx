'use client';

import Link from 'next/link';

import { MobileNavigation, NavLinks } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { useBreakpoints } from '@/shared/lib/hooks';
import { Container } from '@/shared/ui';
import { PokemonTitle } from '@/shared/ui/icons';

export const Header = () => {
  const { mobile, tablet } = useBreakpoints();
  const isMobileView = mobile || tablet;

  return (
    <header className="bg-yellow h-[70px] w-full sticky top-0 z-[1001] pointer-events-auto transition-colors duration-theme tablet:h-[60px]">
      <Container className="flex justify-between items-center h-full">
        <Link href="/">
          <PokemonTitle
            className="text-blue transition-transform duration-300 hover:scale-110"
            width={isMobileView ? 80 : 120}
            height={isMobileView ? 80 : 120}
          />
        </Link>

        {isMobileView ? (
          <MobileNavigation />
        ) : (
          <div
            data-testid="desktop-nav"
            className="flex items-center gap-8"
          >
            <NavLinks />
            <ThemeSwitcher />
          </div>
        )}
      </Container>
    </header>
  );
};
