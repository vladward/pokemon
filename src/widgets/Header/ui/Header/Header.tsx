import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router';

import { NavLinks } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { useBreakpoints } from '@/shared/lib/hooks';
import { BurgerButton, Container } from '@/shared/ui';
import { PokemonTitle } from '@/shared/ui/icons';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mobile, tablet } = useBreakpoints();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link to="/">
          <PokemonTitle
            width={120}
            height={120}
          />
        </Link>
        {mobile || tablet ? (
          <>
            <BurgerButton
              isActive={isOpen}
              onClick={toggleMenu}
            />

            <div className={`${styles.drawer} ${isOpen ? styles.isOpen : ''}`}>
              <nav className={styles.navigation}>
                <div className={styles.actions}>
                  <NavLinks isVertical />
                  <ThemeSwitcher />
                </div>
              </nav>
            </div>

            <div
              className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
              onClick={toggleMenu}
            />
          </>
        ) : (
          <div className={styles.desktopNav}>
            <NavLinks />
            <ThemeSwitcher />
          </div>
        )}
      </Container>
    </header>
  );
};
