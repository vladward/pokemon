import { FC } from 'react';
import Image from 'next/image';

import { Cynthia } from '@/shared/assets';
import { Container } from '@/shared/ui';

export const LeaguePreview: FC = () => {
  return (
    <section className="w-full py-[60px] px-[60px] overflow-hidden bg-background text-foreground transition-colors duration-theme laptop:py-10 laptop:px-[30px]">
      <Container>
        <div className="flex items-center gap-10 laptop:flex-col-reverse laptop:text-center">
          <div className="flex-1">
            <h2 className="text-[2.8rem] text-lightBlue m-0 mb-[25px] font-black uppercase">
              Арена Чемпионов
            </h2>

            <blockquote className="m-0 mb-[30px] pl-[25px] border-l-[5px] border-yellow laptop:border-l-0 laptop:border-t-4 laptop:pt-5 laptop:pl-0">
              <p className="text-[1.15rem] leading-[1.7] mb-5 italic opacity-90 last:mb-0">
                «Турнир Лиги — это не просто серия сражений. Это момент истины, когда воля тренера и
                вера его покемона сливаются в единую энергию, способную творить чудеса на стадионе.»
              </p>
              <p className="text-[1.15rem] leading-[1.7] mb-5 italic opacity-90 last:mb-0">
                «Пройти через все испытания регионов и зажечь священный огонь Молтреса на открытии —
                мечта каждого исследователя. Готов ли ты узнать правила величайшего фестиваля мира?»
              </p>
            </blockquote>

            <div>
              <p className="font-extrabold text-lightBlue text-[1.2rem] m-0 mb-[10px] uppercase">
                Изучи этапы турнира и традиции Лиги Покемонов!
              </p>
            </div>
          </div>

          <div className="flex-[0_0_380px] laptop:flex-[0_0_auto] laptop:w-[260px]">
            <Image
              src={Cynthia}
              alt="Champion Cynthia"
              className="w-full h-auto transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
