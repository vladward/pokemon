import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/shared/ui';

import styles from './HomeCard.module.scss';

type Props = {
  card: {
    title: string;
    description: string;
    image: ReactNode;
    link: string;
    btnText: string;
  };
};

export const HomeCard: FC<Props> = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.homeCard}>
      <div className={styles.homeCard__imageWrapper}>{card.image}</div>
      <div className={styles.homeCard__content}>
        <h3 className={styles.homeCard__title}>{card.title}</h3>
        <p className={styles.homeCard__description}>{card.description}</p>
        <div className={styles.homeCard__action}>
          <Button
            className={styles.homeCard__button}
            onClick={() => navigate(card.link)}
          >
            {card.btnText}
          </Button>
        </div>
      </div>
    </div>
  );
};
