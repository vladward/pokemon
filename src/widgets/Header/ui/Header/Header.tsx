'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { MobileNavigation, NavLinks } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { useBreakpoints } from '@/shared/lib/hooks';
import { Container } from '@/shared/ui';
import { PokemonTitle } from '@/shared/ui/icons';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mobile, tablet } = useBreakpoints();
  const isMobileView = mobile || tablet;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="bg-yellow h-[70px] w-full sticky top-0 z-[100] transition-colors duration-theme tablet:h-[100px]">
      <Container className="flex justify-between items-center h-full">
        <Link href="/">
          <PokemonTitle
            className="text-blue transition-transform duration-300 hover:scale-110"
            width={120}
            height={120}
          />
        </Link>

        {isMobileView ? (
          <MobileNavigation
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            onClose={() => setIsOpen(false)}
          />
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
