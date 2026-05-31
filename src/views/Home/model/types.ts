import type { StaticImageData } from 'next/image';
import { ComponentType, ReactNode, SVGProps } from 'react';

import { PokemonType } from '@/shared/model';

export type AbilitiesSectionType = {
  id: string;
  title: string;
  description: string;
  image: StaticImageData | ComponentType<SVGProps<SVGSVGElement>>;
  link: string;
  btnText: string;
  isBlured: boolean;
};

export type ElementsDataType = {
  id: string;
  name: string;
  color: `var(--type-${PokemonType})`;
  icon: ReactNode;
};

export type LeagueDataType = {
  step: string;
  title: string;
  desc: string;
};
