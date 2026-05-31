import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import { AbilityCard } from '@/views/Home/ui/HomeCard/AbilityCard';

import { Container } from '@/shared/ui';

import { abilitiesData } from '../../model';

export const AbilitiesSection: FC = async () => {
  const t = await getTranslations();
  return (
    <section className="w-full text-center py-[100px] px-5 mobile:py-8 bg-secondary text-foreground transition-colors duration-theme border-y border-y-[color-mix(in_srgb,var(--bg-secondary),black_3%)]">
      <Container>
        <div className="text-center mb-[60px] mobile:mb-7 flex flex-col items-center gap-[15px]">
          <h2 className="text-[2.8rem] text-lightBlue font-black uppercase tracking-[1px] m-0 leading-tight">
            {t('abilities.title')}
            <span className="text-yellow shadow-pokemon">{t('abilities.title_colored')}</span>
          </h2>
          <p className="text-[1.2rem] max-w-[700px] leading-relaxed m-0 after:content-[''] after:block after:w-[60px] after:h-1 after:bg-yellow after:mt-5 after:mx-auto after:rounded-sm">
            {t('abilities.description')}
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px] w-full justify-items-center">
          {abilitiesData.map((ability) => (
            <AbilityCard
              key={ability.id}
              card={ability}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
