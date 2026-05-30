import { useEffect, useState } from 'react';

import { HOME_PAGE_TO_TOP_SIZE } from '@/shared/constants/constants';
import { ArrowTop, Button } from '@/shared/ui';

import styles from './ToTopButton.module.scss';

export const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > HOME_PAGE_TO_TOP_SIZE - 1;
      setIsVisible((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => window.scrollTo({ top: 0 });

  return (
    <Button
      className={`${styles.topBtn} ${isVisible ? styles.visible : ''}`}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowTop />
    </Button>
  );
};
