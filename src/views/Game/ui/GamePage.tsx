import { QuizPanel } from '@/widgets/QuizPanel';

export const GamePageView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <QuizPanel />
    </div>
  );
};
