import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { PokemonButton } from '@/shared/ui';

export default async function NotFound() {
  const t = await getTranslations('not_found');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <h1 className="text-[6rem] font-bold text-lightBlue leading-none mb-2">404</h1>
      <h2 className="text-[2rem] font-bold text-yellow shadow-pokemon mb-4">{t('title')}</h2>
      <p className="text-[1.1rem]  max-w-[500px] mb-8">{t('description')}</p>
      <Link href="/">
        <PokemonButton className="hover:scale-[1.02]">{t('button')}</PokemonButton>
      </Link>
    </div>
  );
}
