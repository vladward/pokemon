import type { FC } from 'react';

import { Container } from '@/shared/ui';

import styles from './EvolutionSection.module.scss';

export const EvolutionSection: FC = () => {
  return (
    <section className={styles.evolution}>
      <Container>
        <div className={styles.evolution__header}>
          <h2 className={styles.evolution__title}>
            Пути <span className={styles.evolution__accent}>Развития</span>
          </h2>
          <p className={styles.evolution__subtitle}>
            Эволюция — это не просто смена облика. Это сложный процесс перестройки ДНК под влиянием
            внешних и внутренних факторов. Узнай, как пробуждается скрытый потенциал.
          </p>
        </div>

        <div className={styles.evolution__grid}>
          <div className={styles.evolution__card}>
            <div className={styles.evolution__badge}>Классика</div>
            <h4 className={styles.evolution__cardTitle}>Биологическая зрелость</h4>
            <p className={styles.evolution__cardText}>
              Самый распространенный путь. По мере накопления жизненного опыта (EXP), клетки
              организма достигают критической массы, запуская мгновенную трансформацию в более
              мощную форму.
            </p>
          </div>

          <div className={styles.evolution__card}>
            <div className={styles.evolution__badge}>Резонанс</div>
            <h4 className={styles.evolution__cardTitle}>Камни Стихий</h4>
            <p className={styles.evolution__cardText}>
              Некоторые виды обладают «спящими» генами, которые активируются только при контакте с
              высококонцентрированной энергией камней (Громовой, Огненный, Водный).
            </p>
          </div>

          <div className={styles.evolution__card}>
            <div className={styles.evolution__badge}>Психология</div>
            <h4 className={styles.evolution__cardTitle}>Уровень Счастья</h4>
            <p className={styles.evolution__cardText}>
              Уникальная форма эволюции, основанная на доверии. Психоэмоциональная связь с тренером
              вызывает выброс эндорфинов, провоцирующий физические изменения в организме.
            </p>
          </div>
        </div>

        <div className={styles.evolution__deepInfo}>
          <div className={styles.evolution__fact}>
            <strong>Важный факт:</strong> Существует «Разветвленная эволюция» (Branching Evolution).
            Один и тот же вид, например Иви, может трансформироваться в 8 разных форм в зависимости
            от условий среды.
          </div>
        </div>
      </Container>
    </section>
  );
};
