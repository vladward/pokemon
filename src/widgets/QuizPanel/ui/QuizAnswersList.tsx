'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';

type QuizzAnswersListType = {
  list: { id: string; title: string; isCorrect: boolean }[];
};

const answersWords: Record<number, 'A' | 'B' | 'C' | 'D'> = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
};

const answerWordColors: Record<number, string> = {
  0: 'bg-yellow',
  1: 'bg-pokemon-dragon',
  2: 'bg-pokemon-fairy',
  3: 'bg-pokemon-bug',
};

export const QuizAnswersList = ({ list }: QuizzAnswersListType) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  return (
    <div className="flex flex-col h-full gap-20 justify-between">
      <div className="flex flex-col gap-4 mb-4">
        {list.map(({ id, title, isCorrect }, index) => (
          <div
            key={id}
            onClick={() => !isAnswered && setSelectedVariant(id)}
            className={cn(
              'flex items-center opacity-90 gap-6 pr-24 border-2 rounded-xl bg-primary-foreground py-3 pl-3 hover:opacity-70 cursor-pointer',
              !isAnswered && selectedVariant === id && 'bg-pokemon-fire hover:opacity-90',
              isAnswered && isCorrect && 'bg-pokemon-grass hover:opacity-90',
              isAnswered &&
                !isCorrect &&
                selectedVariant === id &&
                'bg-destructive hover:opacity-90',
            )}
          >
            <div
              className={cn(
                `px-4 py-2 flex items-center justify-center ${answerWordColors[index]} text-white font-bold text-xl border-2 border-black dark:border-border rounded-full border-type-fighting`,
              )}
            >
              {answersWords[index]}
            </div>
            <span className="text-xl">{title}</span>
          </div>
        ))}
      </div>
      <Button
        disabled={!selectedVariant}
        onClick={() => setIsAnswered(true)}
      >
        Submit!
      </Button>
    </div>
  );
};
