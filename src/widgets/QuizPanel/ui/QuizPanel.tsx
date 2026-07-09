import { PokemonLoader } from '@/views/Pokemon';

import { QuizAnswersList } from './QuizAnswersList';

export const QuizPanel = () => {
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

  return (
    <div className="flex items-center justify-center px-14 py-14 ">
      {variants.length ? <QuizAnswersList list={variants} /> : <PokemonLoader />}
    </div>
  );
};
