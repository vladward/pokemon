import { QuizzAnswersList } from './QuizzAnswersList';
import { PokemonLoader } from '@/views/Pokemon';

export const QuizzPanel = () => {
  const variants = [
    {
      id: '1',
      title: 'Pikachu',
      isCorrect: true,
    },
    {
      id: '2',
      title: 'Bulbasaur',
      isCorrect: false,
    },
    {
      id: '3',
      title: 'Mewtho',
      isCorrect: false,
    },
    {
      id: '4',
      title: 'Psyduck',
      isCorrect: false,
    },
  ];

  return <div>{variants.length ? <QuizzAnswersList list={variants} /> : <PokemonLoader />}</div>;
};
