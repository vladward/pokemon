'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { MessageKeys, Messages, NestedKeyOf } from 'use-intl/core';

import { cn } from '@/shared/lib/utils/cn';

type NavLinksProps = {
  isVertical?: boolean;
  isCentered?: boolean;
  action?: () => void;
};

type MessageKey = MessageKeys<Messages, NestedKeyOf<Messages>>;

type NavLinksState = {
  url: '/pokemon' | '/skills' | '/items' | '/game';
  title: MessageKey;
};

const links: NavLinksState[] = [
  { url: '/pokemon', title: 'navigation.pokemon' },
  { url: '/skills', title: 'navigation.skills' },
  { url: '/items', title: 'navigation.items' },
  { url: '/game', title: 'navigation.game' },
];

export const NavLinks = ({ isVertical, isCentered, action }: NavLinksProps) => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <nav>
      <ul
        className={cn(
          'w-max flex justify-between items-center list-none p-0 m-0 gap-3',
          isVertical && 'flex-col items-start w-full mb-5',
          isCentered && 'items-center',
        )}
      >
        {links.map(({ url, title }) => {
          const isActive = pathname.includes(url);
          return (
            <li key={url}>
              <Link
                href={url}
                onClick={action}
                className={cn(
                  'text-[22px] px-3 py-2 no-underline text-yellow shadow-pokemon font-bold',
                  'transition-all duration-300 inline-block',
                  'hover:text-lightBlue hover:-translate-y-0.5 hover:[text-shadow:0_0_5px_#fff,_0_0_10px_#2a75bb,_0_0_20px_#2a75bb]',
                  isVertical && 'text-[28px] px-0 py-0',
                  isActive &&
                    'text-lightBlue -translate-y-0.5 [text-shadow:0_0_5px_#fff,_0_0_10px_#2a75bb,_0_0_20px_#2a75bb]',
                )}
              >
                {t(title)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
