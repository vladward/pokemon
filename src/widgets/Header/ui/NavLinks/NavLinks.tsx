import type { FC } from 'react';
import { Link } from 'react-router';

import styles from './NavLinks.module.scss';

export const NavLinks: FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link to="#">Pokemons</Link>
        </li>
        <li>
          <Link to="#">Skills</Link>
        </li>
        <li>
          <Link to="#">Items</Link>
        </li>
        <li>
          <Link to="#">Game</Link>
        </li>
      </ul>
    </nav>
  );
};
