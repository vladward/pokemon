import { FC, ReactNode } from 'react';

import styles from './ElementCard.module.scss';

interface PokemonTypeCardProps {
  name: string;
  color: string;
  image: ReactNode | string;
  onClick?: () => void;
}

export const ElementCard: FC<PokemonTypeCardProps> = ({ name, color, image, onClick }) => {
  return (
    <div
      className={styles.typeCard}
      onClick={onClick}
      style={{ '--type-color': color } as React.CSSProperties}
    >
      <div className={styles.typeCard__imageWrapper}>
        <div className={styles.typeCard__node}>{image}</div>
      </div>
      <span className={styles.typeCard__name}>{name}</span>
    </div>
  );
};
