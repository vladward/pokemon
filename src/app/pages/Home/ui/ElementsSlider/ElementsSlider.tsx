import type { FC } from 'react';

import { ElementCard, InfiniteSlider } from '@/shared/ui';
import {
  Bug,
  Fire,
  Water,
  Grass,
  Electric,
  Ice,
  Fighting,
  Poison,
  Ground,
  Flying,
  Psychic,
  Rock,
  Ghost,
  Dragon,
  Steel,
  Fairy,
  Dark,
  Normal,
} from '@/shared/ui/icons';

const originalTypes = [
  { id: '1', name: 'Огонь', color: '#FBA54C', icon: <Fire /> },
  { id: '2', name: 'Вода', color: '#539DDF', icon: <Water /> },
  { id: '3', name: 'Трава', color: '#5FBD58', icon: <Grass /> },
  { id: '4', name: 'Электро', color: '#F2D94E', icon: <Electric /> },
  { id: '5', name: 'Лед', color: '#75D0C1', icon: <Ice /> },
  { id: '6', name: 'Боевой', color: '#D3425F', icon: <Fighting /> },
  { id: '7', name: 'Яд', color: '#B763CF', icon: <Poison /> },
  { id: '8', name: 'Земля', color: '#DA7C4D', icon: <Ground /> },
  { id: '9', name: 'Полет', color: '#A1BBEC', icon: <Flying /> },
  { id: '10', name: 'Психо', color: '#FA8581', icon: <Psychic /> },
  { id: '11', name: 'Жук', color: '#92BC2C', icon: <Bug /> },
  { id: '12', name: 'Камень', color: '#C9BB8A', icon: <Rock /> },
  { id: '13', name: 'Призрак', color: '#5F6DBC', icon: <Ghost /> },
  { id: '14', name: 'Дракон', color: '#0C69C8', icon: <Dragon /> },
  { id: '15', name: 'Сталь', color: '#5695A3', icon: <Steel /> },
  { id: '16', name: 'Фея', color: '#EE90E6', icon: <Fairy /> },
  { id: '17', name: 'Темный', color: '#595761', icon: <Dark /> },
  { id: '18', name: 'Обычный', color: '#A0A29F', icon: <Normal /> },
];

export const ElementsSlider: FC = () => {
  return (
    <div>
      <InfiniteSlider
        title="Классификация по элементам"
        items={originalTypes}
        cardWidth={250}
        gap={20}
        renderItem={({ name, color, icon }) => (
          <ElementCard
            name={name}
            color={color}
            image={icon}
          />
        )}
      />
    </div>
  );
};
