'use client';

import type { FC } from 'react';
import Link from 'next/link';

import { NavLinks } from '@/widgets/Header';

import { useBreakpoints } from '@/shared/lib/hooks';
import { PokemonTitle } from '@/shared/ui';

export const Footer: FC = () => {
  const { mobile } = useBreakpoints();
  return (
    <footer className="w-full flex flex-col px-[5vw] bg-yellow transition-colors duration-theme">
      <div className="flex flex-col justify-center items-center pb-10 mobile:pb-0">
        <Link href="/">
          <PokemonTitle
            className="text-blue transition-transform duration-300 hover:scale-110"
            width={120}
            height={120}
          />
        </Link>
        <NavLinks
          isVertical={mobile}
          isCentered
        />
      </div>
      <div className="text-center py-5 border-t border-[#cdc1c1] text-blue">
        <span>
          2026{' '}
          <Link
            href="https://github.com/vladward"
            className="text-yellow shadow-pokemon transition-all duration-300 hover:text-lightBlue hover:[text-shadow:0_0_5px_#fff,_0_0_10px_#2a75bb,_0_0_20px_#2a75bb]"
          >
            Vladward
          </Link>
          . All rights reserved.
        </span>
      </div>
    </footer>
  );
};
