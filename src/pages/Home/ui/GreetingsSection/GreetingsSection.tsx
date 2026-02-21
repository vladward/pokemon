import type { FC } from 'react';

import { Pokemons } from '@/shared/assets';
import { Container } from '@/shared/ui';

import styles from './GreetingsSection.module.scss';

export const GreetingsSection: FC = () => {
  return (
    <div className={styles.greetings}>
      <Container className={styles.inner}>
        <div className={styles.greetings__info}>
          <p className={styles.greetings__info__greetings}>Энциклопедия мира Pokemon</p>
          <h1 className={styles.greetings__info__title}>
            Добро пожаловать в мир
            <span className={styles.greetings__info__title_highlighted}> покемонов</span>
          </h1>
          <h2 className={styles.greetings__info__description}>
            Стань лучшим тренером: исследуй виды, изучай их способности и собирай свою идеальную
            команду. Твоё приключение начинается здесь!
          </h2>
        </div>
        <img
          src={Pokemons}
          alt="pokemons_main"
          className={styles.greetings__image}
        />
      </Container>
    </div>
  );
};
