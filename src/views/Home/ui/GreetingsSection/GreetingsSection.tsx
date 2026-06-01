'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import { Pokemon } from '@/shared/assets';
import { HOME_PAGE_TO_TOP_SIZE } from '@/shared/constants/constants';
import { Button, Container } from '@/shared/ui';

export const GreetingsSection: FC = () => {
  const t = useTranslations();
  return (
    <div className="flex items-center justify-center py-[120px] w-full bg-background text-foreground transition-colors duration-theme tablet:py-10 mobile:py-6">
      <Container className="flex justify-between items-center flex-col h-full">
        <div className="flex flex-row items-center text-start gap-10 tablet:text-center tablet:flex-col mobile:text-center mobile:flex-col">
          <h1 className="h-max text-[5rem] font-bold text-lightBlue leading-tight tablet:text-[4rem] mobile:text-[3rem]">
            {t('home.greetings')}
            <span className="text-yellow shadow-pokemon">{t('home.pokemon')}</span>
          </h1>
          <Image
            src={Pokemon}
            alt="pokemons_main"
            priority
            className="w-[45%] py-5 transition-transform duration-300 hover:scale-105 tablet:w-full mobile:w-full"
          />
        </div>
        <h2 className="my-10 mb-[80px] text-[2rem] font-medium text-center leading-tight tablet:mb-0 tablet:text-[2rem] mobile:mb-0 mobile:text-[1.5rem]">
          {t('home.description')}
        </h2>
        <Button
          className="transition-all duration-300 hover:scale-[1.02] tablet:hidden mobile:hidden"
          onClick={() => window.scrollTo({ top: HOME_PAGE_TO_TOP_SIZE })}
        >
          {t('home.start')}
        </Button>
      </Container>
    </div>
  );
};
