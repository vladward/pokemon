import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { ProfessorOak } from '@/shared/assets';
import { Container } from '@/shared/ui';

export const EvolutionPreview: FC = async () => {
  const t = await getTranslations();
  return (
    <section className="w-full py-[60px] px-[60px] relative overflow-hidden bg-background text-foreground transition-colors duration-theme laptop:py-[30px] laptop:px-5 mobile:py-5">
      <Container>
        <div className="flex items-center gap-10 laptop:flex-col laptop:text-center">
          <div className="flex-[0_0_350px] flex justify-center laptop:flex-[0_0_auto] laptop:w-[250px]">
            <Image
              src={ProfessorOak}
              alt="Professor Oak"
              className="w-full h-auto transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-[2.2rem] text-lightBlue m-0 mb-[25px] font-extrabold uppercase">
              {t('evolution_preview.title')}
            </h2>

            <blockquote className="m-0 mb-[30px] pl-5 border-l-[5px] border-yellow laptop:border-l-0 laptop:border-t-[5px] laptop:pt-5 laptop:pl-0">
              <p className="text-[1.1rem] leading-relaxed mb-[15px] italic last:mb-0">
                {t('evolution_preview.note_first')}
              </p>
              <p className="text-[1.1rem] leading-relaxed mb-[15px] italic last:mb-0">
                {t('evolution_preview.note_second')}
              </p>
            </blockquote>

            <div className="flex flex-col gap-[10px]">
              <p className="font-extrabold text-lightBlue leading-snug text-[1.2rem] uppercase">
                {t('evolution_preview.description')}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
