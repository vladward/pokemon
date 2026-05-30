import { FC } from 'react';

import { HomeCard } from '@/pages';

import { Container } from '@/shared/ui';

import { abilitiesData } from '../../model';

import styles from './AbilitiesSection.module.scss';

export const AbilitiesSection: FC = () => {
  return (
    <section className={styles.abilities}>
      <Container>
        <div className={styles.abilities__intro}>
          <h2 className={styles.abilities__title}>
            Твоя подготовка к <span className={styles.abilities__accent}>Лиге Чемпионов</span>
          </h2>
          <p className={styles.abilities__subtitle}>
            Мастерами не рождаются — ими становятся те, кто знает слабые места врага и возможности
            своих союзников. Начни обучение прямо сейчас!
          </p>
        </div>
        <div className={styles.abilities__grid}>
          {abilitiesData.map((ability) => (
            <HomeCard
              key={ability.id}
              card={ability}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
