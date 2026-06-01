import type { StaticImageData } from 'next/image';
import { ComponentType, ReactNode, SVGProps } from 'react';
import type { MessageKeys, Messages, NestedKeyOf } from 'use-intl/core';

import { PokemonType } from '@/shared/model';

type MessageKey = MessageKeys<Messages, NestedKeyOf<Messages>>;

export type AbilitiesSectionType = {
  id: string;
  title: MessageKey;
  description: MessageKey;
  image: StaticImageData | ComponentType<SVGProps<SVGSVGElement>>;
  link: string;
  btnText: MessageKey;
  isBlured?: boolean;
};

export type ElementsDataType = {
  id: string;
  name: MessageKey;
  color: `var(--type-${PokemonType})`;
  icon: ReactNode;
};

export type LeagueDataType = {
  step: string;
  title: MessageKey;
  desc: MessageKey;
};
