import type { FC } from 'react';

import styles from './NavLinks.module.scss';

export const NavLinks: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <a href="#">Pokemons</a>
        </li>
        <li>
          <a href="#">Skills</a>
        </li>
        <li>
          <a href="#">Items</a>
        </li>
        <li>
          <a href="#">Game</a>
        </li>
      </ul>
    </nav>
  );
};
