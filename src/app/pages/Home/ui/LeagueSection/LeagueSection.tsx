import { FC } from 'react';

import styles from './LeagueSection.module.scss';

export const LeagueSection: FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Отборочные этапы (Preliminary Rounds)',
      desc: 'Битвы проходят на специализированных аренах: Трава, Лед, Камень и Вода. Тренер должен уметь использовать особенности ландшафта, чтобы одержать победу в условиях меняющейся среды.',
    },
    {
      num: '02',
      title: 'Финальная стадия (Full Battles)',
      desc: 'Сражения 6 на 6 на центральном стадионе перед тысячами зрителей. Здесь на первый план выходит не только стратегия, но и глубина связи между тренером и каждым членом его команды.',
    },
    {
      num: '03',
      title: 'Церемония Зала Славы',
      desc: 'Победитель Лиги вписывает свое имя в историю региона. Это высшая честь, означающая, что исследователь достиг полного взаимопонимания со своими покемонами.',
    },
  ];

  return (
    <section className={styles.league}>
      <div className={styles.league__container}>
        <div className={styles.league__main}>
          <h3 className={styles.league__subTitle}>Спортивная Хроника</h3>
          <h2 className={styles.league__title}>
            Традиции <span className={styles.league__accent}>Лиги Покемонов</span>
          </h2>

          <div className={styles.league__list}>
            {steps.map((step) => (
              <div
                key={step.num}
                className={styles.league__item}
              >
                <div className={styles.league__stepNum}>{step.num}</div>
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
    </section>
  );
};
