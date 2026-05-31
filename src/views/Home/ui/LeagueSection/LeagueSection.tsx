import { FC } from 'react';

import { leagueData } from '@/views/Home/model';

import { Container } from '@/shared/ui';

export const LeagueSection: FC = () => {
  return (
    <section className="py-[100px] px-5 bg-secondary w-full text-foreground transition-colors duration-theme border-y border-y-[color-mix(in_srgb,var(--bg-secondary),black_3%)] laptop:py-[60px]">
      <Container>
        <div className="grid grid-cols-[1.5fr_1fr] gap-[80px] items-start laptop:grid-cols-1 laptop:gap-[50px]">
          <div>
            <h3 className="text-lightBlue uppercase text-[0.85rem] tracking-[3px] mb-3 font-extrabold">
              Спортивная Хроника
            </h3>
            <h2 className="text-[3rem] text-lightBlue font-black m-0 mb-[50px] leading-tight laptop:text-[2.2rem]">
              Традиции <span className="text-yellow shadow-pokemon">Лиги Покемонов</span>
            </h2>

            <div className="flex flex-col gap-[45px]">
              {leagueData.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-[35px] pb-[35px] border-b-2 border-dashed border-lightBlue last:border-b-0"
                >
                  <div className="w-[65px] h-[65px] flex-shrink-0 flex items-center justify-center text-[1.6rem] font-black text-lightBlue bg-yellow rounded-2xl border-[3px] border-lightBlue laptop:w-[55px] laptop:h-[55px] laptop:text-[1.3rem]">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-[1.4rem] text-lightBlue m-0 mb-3 font-extrabold">
                      {step.title}
                    </h4>
                    <p className="leading-[1.7] text-[1.05rem] m-0">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="sticky top-[100px] laptop:static">
            <div className="relative bg-tertiary px-10 py-10 rounded-[28px] border-[4px] border-lightBlue shadow-[15px_15px_0_rgba(42,117,187,0.1)]">
              <h5 className="text-lightBlue text-[1.25rem] m-0 mb-[15px] font-black uppercase">
                Тайны Стадиона
              </h5>
              <p className="text-blue leading-[1.7] italic text-[1rem] m-0">
                Знаете ли вы, что перед открытием каждого турнира эстафетой доставляется священный
                огонь легендарного Молтреса? Пока это пламя горит в чаше стадиона, оно оберегает
                честный дух соревнований.
              </p>
              <div className="absolute top-5 right-5 flex gap-2">
                <span className="w-3 h-3 rounded-full bg-lightBlue shadow-[0_0_8px_rgba(77,164,255,0.6)] block" />
                <span className="w-3 h-3 rounded-full bg-yellow shadow-[0_0_8px_rgba(255,203,5,0.6)] block" />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
};
