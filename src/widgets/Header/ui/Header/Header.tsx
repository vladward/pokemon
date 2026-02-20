import type { FC } from 'react';
import { Link } from 'react-router';

import { NavLinks } from '@/widgets/Header';

import { Container } from '@/shared/ui';
import { PokemonTitle } from '@/shared/ui/icons';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link to="/">
          <PokemonTitle
            width={120}
            height={120}
          />
        </Link>
        <NavLinks />
      </Container>
    </header>
  );
};
