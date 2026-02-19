import type { FC } from 'react';

import { ProfessorOak } from '@/shared/assets';

import styles from './EvolutionPreview.module.scss';

export const EvolutionPreview: FC = () => {
  return (
    <section className={styles.evolutionPre}>
      <div className={styles.evolutionPre__container}>
        <div className={styles.evolutionPre__imageWrapper}>
          <img
            src={ProfessorOak}
            alt="Professor Oak"
            className={styles.evolutionPre__image}
          />
        </div>

        <div className={styles.evolutionPre__content}>
          <h2 className={styles.evolutionPre__title}>Раскрой скрытый потенциал!</h2>

          <blockquote className={styles.evolutionPre__quote}>
            <p className={styles.evolutionPre__text}>
              «Эволюция — это не просто смена облика, это величайшее таинство природы. Я посвятил
              жизнь изучению того, как внутренняя энергия трансформируется, превращая скромное
              существо в могучего исполина.»
            </p>
            <p className={styles.evolutionPre__text}>
              «Некоторые виды меняются от опыта, другие — под влиянием редких камней. Понимание этих
              путей — признак истинного исследователя.»
            </p>
          </blockquote>

          <div className={styles.evolutionPre__cta}>
            <p className={styles.evolutionPre__ctaText}>
              Узнай, какие секреты скрывает генетический код и как направить развитие покемона по
              нужному пути. Исследуй механизмы эволюции!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
