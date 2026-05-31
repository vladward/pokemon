import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import { AshKetchum } from '@/shared/assets';
import { Container } from '@/shared/ui';

export const ElementsPreview: FC = async () => {
  const t = await getTranslations();
  return (
    <section className="w-full py-[60px] px-[60px] relative overflow-hidden bg-background text-foreground transition-colors duration-theme laptop:py-[30px] laptop:px-5 mobile:py-5">
      <Container className="w-full">
        <div className="flex items-center justify-between laptop:flex-col laptop:text-center">
          <div className="flex-1 z-[5] text-left laptop:text-center">
            <h2 className="text-[2.2rem] text-lightBlue m-0 mb-5 font-extrabold leading-tight uppercase">
              {t('elements_preview.title')}
            </h2>

            <blockquote className="m-0 mb-[30px] pl-[25px] border-l-[5px] border-yellow laptop:border-l-0 laptop:border-t-4 laptop:pt-[15px] laptop:pl-0">
              <p className="text-[1.1rem] leading-relaxed mb-[15px] italic last:mb-0">
                {t('elements_preview.note_first')}
              </p>
              <p className="text-[1.1rem] leading-relaxed mb-[15px] italic last:mb-0">
                {t('elements_preview.note_second')}
              </p>
            </blockquote>

            <div className="flex flex-col items-start gap-2 laptop:items-center">
              <p className="font-extrabold text-lightBlue uppercase text-[1.2rem] tracking-[1px]">
                {t('elements_preview.description')}
              </p>
            </div>
          </div>

          <div className="flex-[0_0_400px] flex items-end laptop:flex-[0_0_auto] laptop:w-[250px] mt-2">
            <Image
              src={AshKetchum}
              alt="Ash Ketchum"
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
