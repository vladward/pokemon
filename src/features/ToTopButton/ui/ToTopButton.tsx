'use client';

import { useEffect, useState } from 'react';

import { HOME_PAGE_TO_TOP_SIZE } from '@/shared/constants/constants';
import { ArrowTop, PokemonButton } from '@/shared/ui';

export const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > HOME_PAGE_TO_TOP_SIZE - 1;
      setIsVisible((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => window.scrollTo({ top: 0 });

  return (
    <PokemonButton
      className={`fixed right-5 bottom-20 z-10 m-[15px] p-3 transition-all duration-300 ease-in-out hover:scale-110 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowTop />
    </PokemonButton>
  );
};
