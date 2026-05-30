'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AbilitiesSectionType } from '@/views/Home/model';

import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils/cn';

type Props = {
  card: AbilitiesSectionType;
};

export const HomeCard: FC<Props> = ({ card }) => {
  const router = useRouter();

  const renderImage = () => {
    if (typeof card.image !== 'function') {
      return (
        <Image
          src={card.image}
          alt={card.title}
          className="max-w-[135px] max-h-full object-contain transition-transform duration-300"
        />
      );
    }

    const Icon = card.image;
    return (
      <Icon
        width={135}
        height={135}
      />
    );
  };

  return (
    <div className="w-[300px] bg-tertiary border-[3px] border-lightBlue rounded-[20px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-center transition-transform duration-300 hover:-translate-y-[5px]">
      <div
        className={cn(
          'flex items-center justify-center w-full h-[210px] overflow-hidden p-5 transition-[filter] duration-300',
          card.isBlured && 'blur-[6px] brightness-[0.8] pointer-events-none select-none',
        )}
      >
        {renderImage()}
      </div>
      <div className="p-5">
        <h3 className="text-lightBlue text-2xl m-0 mb-[10px] uppercase tracking-[1px]">
          {card.title}
        </h3>
        <p className="text-blue text-[0.95rem] leading-snug m-0 mb-[25px] min-h-[60px]">
          {card.description}
        </p>
        <div className="flex justify-center">
          <Button onClick={() => router.push(card.link)}>{card.btnText}</Button>
        </div>
      </div>
    </div>
  );
};
