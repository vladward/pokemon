import { FC } from 'react';
import { useNavigate } from 'react-router';

import { AbilitiesSectionType } from '@/pages/Home/model';

import { Button } from '@/shared/ui';

import styles from './HomeCard.module.scss';

type Props = {
  card: AbilitiesSectionType;
};

export const HomeCard: FC<Props> = ({ card }) => {
  const navigate = useNavigate();

  const renderImage = () => {
    if (typeof card.image === 'string') {
      return (
        <img
          src={card.image}
          alt={card.title}
          className={styles.homeCard__image}
        />
      );
    }

    const Icon = card.image;
    return (
      <Icon
        width={135}
        height={135}
        className={styles.homeCard__icon}
      />
    );
  };

  return (
    <div className={styles.homeCard}>
      <div
        className={
          card.isBlured ? styles.homeCard__imageWrapper_blured : styles.homeCard__imageWrapper
        }
      >
        {renderImage()}
      </div>
      <div className={styles.homeCard__content}>
        <h3 className={styles.homeCard__title}>{card.title}</h3>
        <p className={styles.homeCard__description}>{card.description}</p>
        <div className={styles.homeCard__action}>
          <Button onClick={() => navigate(card.link)}>{card.btnText}</Button>
        </div>
      </div>
    </div>
  );
};
