import { Link } from 'react-router';

import styles from './NavLinks.module.scss';

type NavLinksProps = {
  isVertical?: boolean;
  isCentered?: boolean;
};

export const NavLinks = ({ isVertical, isCentered }: NavLinksProps) => {
  return (
    <nav className={`${styles.nav} ${isVertical ? styles.vertical : ''}`}>
      <ul className={`${styles.navList} ${isCentered ? styles.centered : ''}`}>
        <li>
          <Link to="/pokemons">Pokemons</Link>
        </li>
        <li>
          <Link to="/skill">Skills</Link>
        </li>
        <li>
          <Link to="/items">Items</Link>
        </li>
        <li>
          <Link to="/game">Game</Link>
        </li>
      </ul>
    </nav>
  );
};
