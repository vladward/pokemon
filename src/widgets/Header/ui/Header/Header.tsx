import type { FC } from 'react';

import { NavLinks } from '@/widgets/Header';

import { PokeballLogo, PokemonTitle } from '@/shared/ui/icons';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <a href="/">
        <PokeballLogo
          width={50}
          height={50}
        />
      </a>
      <PokemonTitle
        width={120}
        height={120}
      />
      <NavLinks />
    </header>
  );
};
