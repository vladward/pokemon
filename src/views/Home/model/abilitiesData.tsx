import { Meowth, Pokeball, SkillFire } from '@/shared/assets/images';
import { Pikachu } from '@/shared/ui';

import { AbilitiesSectionType } from './types';

export const abilitiesData: AbilitiesSectionType[] = [
  {
    id: '1',
    title: 'Покемоны',
    description:
      'Полная энциклопедия существ: характеристики, типы, эволюции и редкие формы покемонов.',
    image: Pikachu,
    link: '/pokemons',
    btnText: 'Исследовать',
    isBlured: false,
  },
  {
    id: '2',
    title: 'Умения',
    description: 'Подробный справочник способностей и атак: узнай, какие эффекты они дают в бою.',
    image: SkillFire,
    link: '/skills',
    btnText: 'Исследовать',
    isBlured: false,
  },
  {
    id: '3',
    title: 'Предметы',
    description: 'Каталог вещей: от лечебных ягод и покеболов до редких камней для эволюции.',
    image: Pokeball,
    link: '/items',
    btnText: 'Исследовать',
    isBlured: false,
  },
  {
    id: '4',
    title: 'Кто это?',
    description: 'Развлекательный режим: попробуй узнать покемона по его силуэту и стань мастером!',
    image: Meowth,
    link: '/game',
    btnText: 'Исследовать',
    isBlured: true,
  },
];
