import { FC } from 'react';

import { HomeCard } from '@/views/Home/ui/HomeCard/HomeCard';

import { Container } from '@/shared/ui';

import { abilitiesData } from '../../model';

export const AbilitiesSection: FC = () => {
  return (
    <section className="w-full text-center py-[100px] px-5 bg-secondary text-foreground transition-colors duration-theme border-y border-y-[color-mix(in_srgb,var(--bg-secondary),black_3%)]">
      <Container>
        <div className="text-center mb-[60px] flex flex-col items-center gap-[15px]">
          <h2 className="text-[2.8rem] text-lightBlue font-black uppercase tracking-[1px] m-0 leading-tight">
            Твоя подготовка к{' '}
            <span className="text-yellow shadow-pokemon">Лиге Чемпионов</span>
          </h2>
          <p className="text-[1.2rem] max-w-[700px] leading-relaxed m-0 after:content-[''] after:block after:w-[60px] after:h-1 after:bg-yellow after:mt-5 after:mx-auto after:rounded-sm">
            Мастерами не рождаются — ими становятся те, кто знает слабые места врага и возможности
            своих союзников. Начни обучение прямо сейчас!
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px] w-full justify-items-center">
          {abilitiesData.map((ability) => (
            <HomeCard
              key={ability.id}
              card={ability}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
