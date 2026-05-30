import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <h1 className="text-[6rem] font-bold text-lightBlue leading-none mb-2">404</h1>
      <h2 className="text-[2rem] font-bold text-yellow shadow-pokemon mb-4">Страница не найдена</h2>
      <p className="text-[1.1rem] text-blue max-w-[500px] mb-8">Похоже, этот покемон сбежал. Попробуй вернуться на главную страницу.</p>
      <Link
        href="/"
        className="bg-yellow text-lightBlue border-[3px] border-lightBlue rounded-[50px] px-[35px] py-[15px] font-bold uppercase shadow-[0_6px_0_#c7a008] transition-all duration-100 ease-in active:shadow-[0_2px_0_#c7a008] active:translate-y-1 hover:scale-[1.02]"
      >
        На главную
      </Link>
    </div>
  );
}
