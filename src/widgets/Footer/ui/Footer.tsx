import NextLink from 'next/link';
import { getTranslations } from 'next-intl/server';

import { MobileTabs } from '@/widgets/Footer';

import { Gamepad, Home, PokeballLogo } from '@/shared/ui';

import { MobileTabProps } from './types';

export async function Footer() {
  const t = await getTranslations();

  const tabs: MobileTabProps[] = [
    {
      name: 'home',
      icon: (
        <Home
          width={34}
          height={34}
        />
      ),
      path: '/',
    },
    {
      name: 'pokemon',
      icon: (
        <PokeballLogo
          width={34}
          height={34}
        />
      ),
      path: '/pokemon',
    },
    {
      name: 'game',
      icon: (
        <Gamepad
          width={34}
          height={34}
        />
      ),
      path: '/game',
    },
  ];

  return (
    <footer className="w-full flex flex-col px-[5vw] bg-yellow transition-colors duration-theme mobile:fixed mobile:bottom-0 mobile:z-20 mobile:p-2 mobile:rounded-t-2xl">
      <div className="mobile:hidden text-center py-5 mobile:py-3 border-t border-[#cdc1c1] text-blue">
        <span>
          {t('footer.created_by')}
          <NextLink
            href="https://github.com/vladward"
            className="text-yellow shadow-pokemon transition-all duration-300 hover:text-lightBlue hover:[text-shadow:0_0_5px_#fff,_0_0_10px_#2a75bb,_0_0_20px_#2a75bb]"
          >
            Vladward
          </NextLink>
          .{t('footer.rights')}
        </span>
      </div>

      <MobileTabs tabs={tabs} />
    </footer>
  );
}
