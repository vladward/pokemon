'use client';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils/cn';

type NavLinksProps = {
  isVertical?: boolean;
  isCentered?: boolean;
  callback?: () => void;
};

type NavLinksState = {
  url: '/pokemons' | '/skills' | '/items' | '/game';
  title: string;
};

const links: NavLinksState[] = [
  { url: '/pokemons', title: 'Pokemons' },
  { url: '/skills', title: 'Skills' },
  { url: '/items', title: 'Items' },
  { url: '/game', title: 'Game' },
];

export const NavLinks = ({ isVertical, isCentered, callback }: NavLinksProps) => {
  return (
    <nav>
      <ul
        className={cn(
          'w-max flex justify-between items-center list-none p-0 m-0 gap-3',
          isVertical && 'flex-col items-start w-full mb-5',
          isCentered && 'items-center',
        )}
      >
        {links.map(({ url, title }) => (
          <li key={url}>
            <Link
              href={url}
              onClick={callback}
              className={cn(
                'text-[22px] px-3 py-2 no-underline text-yellow shadow-pokemon font-bold',
                'transition-all duration-300 inline-block',
                'hover:text-lightBlue hover:-translate-y-0.5 hover:[text-shadow:0_0_5px_#fff,_0_0_10px_#2a75bb,_0_0_20px_#2a75bb]',
                isVertical && 'text-[28px] px-0 py-0',
              )}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
