import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { evolutionData } from '@/views/Home/model';

import { Container } from '@/shared/ui';

export const EvolutionSection: FC = async () => {
  const t = await getTranslations();
  return (
    <section className="w-full py-[100px] px-5 bg-secondary text-foreground transition-colors duration-theme border-y border-y-[color-mix(in_srgb,var(--bg-secondary),black_3%)]">
      <Container>
        <div className="text-center mb-[60px]">
          <h2 className="text-[2.5rem] text-lightBlue font-black uppercase">
            {t('evolution_way.title')}
            <span className="text-yellow shadow-pokemon">{t('evolution_way.subtitle')}</span>
          </h2>
          <p className="text-[1.1rem] max-w-[600px] mx-auto mt-5 leading-relaxed">
            {t('evolution_way.description')}
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
          {evolutionData.map(({ badge, title, text }) => (
            <div
              key={badge}
              className="bg-tertiary px-[30px] pt-[40px] pb-[40px] rounded-[20px] border border-blue relative transition-all duration-300 hover:border-lightBlue hover:-translate-y-[5px] hover:shadow-[0_15px_30px_rgba(42,117,187,0.08)]"
            >
              <div className="absolute -top-3 left-[30px] bg-lightBlue text-white px-3 py-2 text-[0.75rem] font-extrabold uppercase rounded-[4px] tracking-[1px]">
                {t(badge)}
              </div>
              <h4 className="text-[1.3rem] text-lightBlue mb-[15px] font-extrabold">{t(title)}</h4>
              <p className="text-[0.95rem] text-blue leading-relaxed m-0">{t(text)}</p>
            </div>
          ))}
        </div>

        <div className="mt-[50px] bg-warning-bg rounded-[15px] px-[35px] py-[25px] border-l-[6px] border-yellow">
          <div className="text-warning-text text-[1.05rem] leading-[1.5]">
            <strong className="text-lightBlue">{t('evolution_way.note.title')}</strong>
            {t('evolution_way.note.description')}
          </div>
        </div>
      </Container>
    </section>
  );
};
