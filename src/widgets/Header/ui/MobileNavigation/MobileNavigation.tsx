'use client';

import { useEffect } from 'react';

import { NavLinks } from '@/widgets/Header';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';

import { BurgerButton } from '@/shared/ui';

import { cn } from '@/shared/lib/utils/cn';

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

      <div
        data-testid="mobile-drawer"
        className={cn(
          'fixed top-0 right-0 w-[320px] h-screen bg-yellow',
          'shadow-[-5px_0_15px_rgba(0,0,0,0.1)] py-[80px] px-[40px] z-[1000]',
          'transition-transform duration-theme ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
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
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]',
          'transition-[opacity,visibility] duration-300 ease-in-out',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible',
        )}
        onClick={onClose}
      />
    </>
  );
};
