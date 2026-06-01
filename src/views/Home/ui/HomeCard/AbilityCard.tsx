import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import { AbilitiesSectionType } from '@/views/Home/model';

import { cn } from '@/shared/lib/utils/cn';
import { PokemonButton } from '@/shared/ui';

type Props = {
  card: AbilitiesSectionType;
};

export const AbilityCard: FC<Props> = async ({ card }) => {
  const t = await getTranslations();

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
    <div className="w-[300px] h-[480px] flex flex-col bg-tertiary border-[3px] border-lightBlue rounded-[20px] overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] text-center transition-transform duration-300 hover:-translate-y-[5px]">
      <div
        className={cn(
          'flex items-center justify-center w-full h-[210px] overflow-hidden p-5 transition-[filter] duration-300',
          card.isBlured && 'blur-[6px] brightness-[0.8] pointer-events-none select-none',
        )}
      >
        {renderImage()}
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <h3 className="text-lightBlue text-2xl m-0 mb-[10px] uppercase tracking-[1px]">
          {t(card.title)}
        </h3>
        <p className="text-blue text-[0.95rem] leading-snug m-0 min-h-[60px]">
          {t(card.description)}
        </p>
        <div className="flex justify-center">
          <Link href={card.link}>
            <PokemonButton>{t(card.btnText)}</PokemonButton>
          </Link>
        </div>
      </div>
    </div>
  );
};
