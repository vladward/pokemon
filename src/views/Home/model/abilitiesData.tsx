import { Meowth, Pokeball, SkillFire } from '@/shared/assets/images';
import { Pikachu } from '@/shared/ui';

import { AbilitiesSectionType } from './types';

export const abilitiesData: AbilitiesSectionType[] = [
  {
    id: '1',
    title: 'abilities.card.pokemon.title',
    description: 'abilities.card.pokemon.description',
    image: Pikachu,
    link: '/pokemons',
    btnText: 'abilities.explore',
  },
  {
    id: '2',
    title: 'abilities.card.skills.title',
    description: 'abilities.card.skills.description',
    image: SkillFire,
    link: '/skills',
    btnText: 'abilities.explore',
  },
  {
    id: '3',
    title: 'abilities.card.items.title',
    description: 'abilities.card.items.description',
    image: Pokeball,
    link: '/items',
    btnText: 'abilities.explore',
  },
  {
    id: '4',
    title: 'abilities.card.who_is_it.title',
    description: 'abilities.card.who_is_it.description',
    image: Meowth,
    link: '/game',
    btnText: 'abilities.explore',
    isBlured: true,
  },
];
