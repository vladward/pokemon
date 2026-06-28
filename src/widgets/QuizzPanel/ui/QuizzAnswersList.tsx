'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button, PokemonButton } from '@/shared/ui';

type QuizzAnswersListType = {
  list: { id: string; title: string; isCorrect: boolean }[];
};

export const QuizzAnswersList = ({ list }: QuizzAnswersListType) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {list.map(({ id, title, isCorrect }) => (
          <PokemonButton
            key={id}
            onClick={() => !isAnswered && setSelectedVariant(id)}
            className={cn(
              'bg-transparent',
              !isAnswered && selectedVariant === id && 'bg-pokemon-fire',
              isAnswered && isCorrect && 'bg-pokemon-grass',
              isAnswered && !isCorrect && selectedVariant === id && 'bg-destructive',
            )}
          >
            {title}
          </PokemonButton>
        ))}
      </div>
      <Button onClick={() => setIsAnswered(true)}>Submit!</Button>
    </>
  );
};
