import type { FC } from 'react';
import { Link } from 'react-router';

import { NavLinks } from '@/widgets/Header';

import { useBreakpoints } from '@/shared/lib/hooks';
import { PokemonTitle } from '@/shared/ui';

import styles from './Footer.module.scss';

export const Footer: FC = () => {
  const { mobile } = useBreakpoints();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__top}>
        <Link to="/">
          <PokemonTitle
            width={120}
            height={120}
          />
        </Link>
        <NavLinks
          isVertical={mobile}
          isCentered
        />
      </div>
      <div className={styles.footer__bottom}>
        <span>
          2026 <Link to="https://github.com/vladward">Vladward</Link>. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
