import { FC } from 'react';

import CynthiaImg from '@/shared/assets/images/cynthia.png';

import styles from './LeaguePreview.module.scss';

export const LeaguePreview: FC = () => {
  return (
    <section className={styles.leaguePre}>
      <div className={styles.leaguePre__container}>
        <div className={styles.leaguePre__content}>
          <h2 className={styles.leaguePre__title}>Арена Чемпионов</h2>

          <blockquote className={styles.leaguePre__quote}>
            <p className={styles.leaguePre__text}>
              «Турнир Лиги — это не просто серия сражений. Это момент истины, когда воля тренера и
              вера его покемона сливаются в единую энергию, способную творить чудеса на стадионе.»
            </p>
            <p className={styles.leaguePre__text}>
              «Пройти через все испытания регионов и зажечь священный огонь Молтреса на открытии —
              мечта каждого исследователя. Готов ли ты узнать правила величайшего фестиваля мира?»
            </p>
          </blockquote>

          <div className={styles.leaguePre__cta}>
            <p className={styles.leaguePre__ctaText}>
              Изучи этапы турнира и традиции Лиги Покемонов!
            </p>
          </div>
        </div>

        <div className={styles.leaguePre__imageWrapper}>
          <img
            src={CynthiaImg}
            alt="Champion Cynthia"
            className={styles.leaguePre__image}
          />
        </div>
      </div>
    </section>
  );
};
