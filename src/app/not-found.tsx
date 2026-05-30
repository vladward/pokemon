'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/shared/ui';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <h1 className="text-[6rem] font-bold text-lightBlue leading-none mb-2">404</h1>
      <h2 className="text-[2rem] font-bold text-yellow shadow-pokemon mb-4">Страница не найдена</h2>
      <p className="text-[1.1rem] text-blue max-w-[500px] mb-8">
        Похоже, этот покемон сбежал. Попробуй вернуться на главную страницу.
      </p>
      <Button
        className="hover:scale-[1.02]"
        onClick={() => router.push('/')}
      >
        На главную
      </Button>
    </div>
  );
}
