import { FC } from 'react';

import { leagueData } from '@/pages/Home/model';

import { Container } from '@/shared/ui';

import styles from './LeagueSection.module.scss';

export const LeagueSection: FC = () => {
  return (
    <section className={styles.league}>
      <Container>
        <div className={styles.league__container}>
          <div className={styles.league__main}>
            <h3 className={styles.league__subTitle}>Спортивная Хроника</h3>
            <h2 className={styles.league__title}>
              Традиции <span className={styles.league__accent}>Лиги Покемонов</span>
            </h2>

            <div className={styles.league__list}>
              {leagueData.map((step) => (
                <div
                  key={step.step}
                  className={styles.league__item}
                >
                  <div className={styles.league__stepNum}>{step.step}</div>
                  <div className={styles.league__stepContent}>
                    <h4 className={styles.league__stepTitle}>{step.title}</h4>
                    <p className={styles.league__stepDesc}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className={styles.league__aside}>
            <div className={styles.league__factCard}>
              <h5 className={styles.league__factTitle}>Тайны Стадиона</h5>
              <p className={styles.league__factText}>
                Знаете ли вы, что перед открытием каждого турнира эстафетой доставляется священный
                огонь легендарного Молтреса? Пока это пламя горит в чаше стадиона, оно оберегает
                честный дух соревнований.
              </p>
              <div className={styles.league__pokedexDecor}></div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};
