'use client';

import type { FC } from 'react';

import { elementsData } from '@/views/Home/model';

import { ElementCard, InfiniteSlider } from '@/shared/ui';

export const ElementsSlider: FC = () => (
  <InfiniteSlider
    title="Классификация по элементам"
    items={elementsData}
    cardWidth={250}
    gap={20}
    className="w-full py-[100px] mobile:py-8 px-5 bg-secondary transition-colors duration-theme border-y border-y-[color-mix(in_srgb,var(--bg-secondary),black_3%)]"
    renderItem={({ name, color, icon }) => (
      <ElementCard
        name={name}
        color={color}
        image={icon}
      />
    )}
  />
);
