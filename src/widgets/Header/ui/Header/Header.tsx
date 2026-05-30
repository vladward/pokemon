import { useEffect, useState } from 'react';
import Link from 'next/link';

import { MobileNavigation, NavLinks } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { useBreakpoints } from '@/shared/lib/hooks';
import { Container } from '@/shared/ui';
import { PokemonTitle } from '@/shared/ui/icons';

import styles from './Header.module.scss';

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
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/">
          <PokemonTitle
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
            className={styles.desktopNav}
          >
            <NavLinks />
            <ThemeSwitcher />
          </div>
        )}
      </Container>
    </header>
  );
};
