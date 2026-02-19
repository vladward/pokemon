import { FC, ReactNode } from 'react';

import { HomeCard } from '@/app/pages';

import { Flask, Gamepad, Pikachu, Swords } from '@/shared/ui';

import styles from './AbilitiesSection.module.scss';

type AbilitiesSectionType = {
  id: string;
  title: string;
  description: string;
  image: ReactNode;
  link: string;
  btnText: string;
};
const abilitiesData: AbilitiesSectionType[] = [
  {
    id: '1',
    title: 'Покемоны',
    description:
      'Полная энциклопедия существ: характеристики, типы, эволюции и редкие формы покемонов.',
    image: <Pikachu />,
    link: '/pokemons',
    btnText: 'Исследовать',
  },
  {
    id: '2',
    title: 'Умения',
    description: 'Подробный справочник способностей и атак: узнай, какие эффекты они дают в бою.',
    image: (
      <Swords
        width={135}
        height={135}
      />
    ),
    link: '/skills',
    btnText: 'Исследовать',
  },
  {
    id: '3',
    title: 'Предметы',
    description: 'Каталог вещей: от лечебных ягод и покеболов до редких камней для эволюции.',
    image: (
      <Flask
        width={135}
        height={135}
      />
    ),
    link: '/items',
    btnText: 'Исследовать',
  },
  {
    id: '4',
    title: 'Кто это?',
    description: 'Развлекательный режим: попробуй узнать покемона по его силуэту и стань мастером!',
    image: (
      <Gamepad
        width={135}
        height={135}
      />
    ),
    link: '/game',
    btnText: 'Исследовать',
  },
];

export const AbilitiesSection: FC = () => {
  return (
    <section className={styles.abilities}>
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
    </section>
  );
};
