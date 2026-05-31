import Link from 'next/link';

import { MobileNavigation } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { NavLinks } from '@/entities/NavLinks';

import { Container } from '@/shared/ui';
import { PokemonTitle } from '@/shared/ui/icons';

export const Header = () => (
  <header className="bg-yellow h-[70px] w-full sticky top-0 z-[1004] pointer-events-auto transition-colors duration-theme tablet:h-[60px]">
    <Container className="flex justify-between items-center h-full">
      <Link href="/">
        <PokemonTitle
          className="text-blue transition-transform duration-300 hover:scale-110 w-[120px] h-[120px] tablet:w-[80px] tablet:h-[80px]"
        />
      </Link>

      <div className="hidden tablet:block">
        <MobileNavigation />
      </div>

      <div
        data-testid="desktop-nav"
        className="flex items-center gap-8 tablet:hidden"
      >
        <NavLinks />
        <ThemeSwitcher />
      </div>
    </Container>
  </header>
);
