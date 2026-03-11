import { useEffect } from 'react';

import { NavLinks } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { BurgerButton } from '@/shared/ui';

import styles from './MobileNavigation.module.scss';

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const MobileNavigation = ({ isOpen, onToggle, onClose }: MobileNavigationProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <BurgerButton
        isActive={isOpen}
        onClick={onToggle}
      />

      <div className={`${styles.drawer} ${isOpen ? styles.isOpen : ''}`}>
        <nav className={styles.navigation}>
          <div className={styles.actions}>
            <NavLinks
              isVertical
              callback={onClose}
            />
            <ThemeSwitcher />
          </div>
        </nav>
      </div>

      <div
        data-testid="overlay"
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />
    </>
  );
};
