import type { FC } from 'react';

import { Pokemons } from '@/shared/assets';
import { HOME_PAGE_TO_TOP_SIZE } from '@/shared/constants/constants';
import { Button, Container } from '@/shared/ui';

import styles from './GreetingsSection.module.scss';

export const GreetingsSection: FC = () => {
  return (
    <div className={styles.greetings}>
      <Container className={styles.inner}>
        <div className={styles.greetings__info}>
          <h1 className={styles.greetings__info__title}>
            Добро пожаловать в мир
            <span className={styles.greetings__info__title_highlighted}> покемонов</span>
          </h1>
          <img
            src={Pokemons}
            alt="pokemons_main"
            className={styles.greetings__image}
          />
        </div>
        <h2 className={styles.greetings__info__description}>
          Стань лучшим тренером: исследуй виды, изучай их способности и собирай свою идеальную
          команду. Твоё приключение начинается здесь!
        </h2>
        <Button
          className={styles.greetings__startBtn}
          onClick={() => window.scrollTo({ top: HOME_PAGE_TO_TOP_SIZE })}
        >
          Начать приключение!
        </Button>
      </Container>
    </div>
  );
};
