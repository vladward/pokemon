import type { FC } from 'react';

import { AshKetchum } from '@/shared/assets';

import styles from './ElementsSection.module.scss';

export const ElementsSection: FC = () => {
  return (
    <section className={styles.elements}>
      <div className={styles.elements__container}>
        <div className={styles.elements__content}>
          <h2 className={styles.elements__title}>Твой путь к познаниям начинается здесь!</h2>

          <blockquote className={styles.elements__quote}>
            <p className={styles.elements__text}>
              «Знаешь, в чем секрет настоящей победы? Это не только уровень твоего напарника.
              Настоящий мастер знает, что даже самый маленький Пикачу может одолеть гиганта, если
              использовать слабости противника.»
            </p>
            <p className={styles.elements__text}>
              «Мир покемонов полон стратегий: огонь плавит сталь, но гаснет под напором воды. Если
              ты хочешь собрать команду мечты, тебе нужно научиться видеть эти связи.»
            </p>
          </blockquote>

          <div className={styles.elements__cta}>
            <p className={styles.elements__ctaText}>
              Сила покемона велика, но знание стихий — безгранично. Стань стратегом, которого не
              сможет удивить ни один противник!
            </p>
          </div>
        </div>

        <div className={styles.elements__imageWrapper}>
          <img
            src={AshKetchum}
            alt="Ash Ketchum"
            className={styles.elements__image}
          />
        </div>
      </div>
    </section>
  );
};
