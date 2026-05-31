import type { FC } from 'react';

import { elementsData } from '@/pages/Home/model';

import { ElementCard, InfiniteSlider } from '@/shared/ui';

import styles from './ElementsSlider.module.scss';

export const ElementsSlider: FC = () => (
  <InfiniteSlider
    title="Классификация по элементам"
    items={elementsData}
    cardWidth={250}
    gap={20}
    className={styles.inner}
    renderItem={({ name, color, icon }) => (
      <ElementCard
        name={name}
        color={color}
        image={icon}
      />
    )}
  />
);
