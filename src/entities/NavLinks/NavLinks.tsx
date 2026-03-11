import { Link } from 'react-router';

import styles from './NavLinks.module.scss';

type NavLinksProps = {
  isVertical?: boolean;
  isCentered?: boolean;
  callback?: () => void;
};

type NavLinksState = {
  url: '/pokemons' | '/skills' | '/items' | '/game';
  title: string;
};

const links: NavLinksState[] = [
  { url: '/pokemons', title: 'Pokemons' },
  { url: '/skills', title: 'Skills' },
  { url: '/items', title: 'Items' },
  { url: '/game', title: 'Game' },
];

export const NavLinks = ({ isVertical, isCentered, callback }: NavLinksProps) => {
  return (
    <nav className={`${styles.nav} ${isVertical ? styles.vertical : ''}`}>
      <ul className={`${styles.navList} ${isCentered ? styles.centered : ''}`}>
        {links.map(({ url, title }) => (
          <li key={url}>
            <Link
              to={url}
              onClick={callback}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
