'use client';

import { CSSProperties, useRef, useEffect, useState, ReactNode } from 'react';

import { cn } from '@/shared/lib/utils/cn';

interface InfiniteSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  title?: string;
  scrollAmount?: number;
  cardWidth?: number;
  gap?: number;
  className?: string;
}

export const InfiniteSlider = <T extends { id: string | number }>({
  items,
  renderItem,
  title,
  scrollAmount = 300,
  cardWidth = 140,
  gap = 16,
  className = '',
}: InfiniteSliderProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const infiniteItems = [...items, ...items, ...items];
  const fullCardWidth = cardWidth + gap;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = fullCardWidth * items.length;
    }
  }, [items.length, fullCardWidth]);

  const handleInfiniteScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const singleSetWidth = fullCardWidth * items.length;

    if (container.scrollLeft >= singleSetWidth * 2) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = singleSetWidth;
    } else if (container.scrollLeft <= 0) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = singleSetWidth;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current && !isAnimating) {
      setIsAnimating(true);
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
      });
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  return (
    <section
      className={cn('px-5 relative overflow-hidden', className)}
      style={{ '--card-width': `${cardWidth}px`, '--gap': `${gap}px` } as CSSProperties}
    >
      {title && (
        <h3 className="text-center text-lightBlue text-2xl uppercase mb-[30px] font-extrabold tracking-[1px]">
          {title}
        </h3>
      )}

      <div className="relative flex items-center max-w-[1400px] mx-auto">
        <button
          className={cn(
            'absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 z-10',
            'bg-lightBlue text-white border-[3px] border-yellow rounded-full text-[2rem]',
            'flex items-center justify-center cursor-pointer',
            'shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
            'hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]',
            'active:scale-95',
          )}
          onClick={() => scroll('left')}
        >
          ‹
        </button>

        <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] tablet:[mask-image:none]">
          <div
            className="flex gap-[var(--gap)] py-5 items-stretch overflow-x-auto scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={scrollRef}
            onScroll={handleInfiniteScroll}
          >
            {infiniteItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-[0_0_var(--card-width)] h-auto flex transition-transform duration-300 [&>*]:w-full"
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        <button
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-0 w-12 h-12 z-10',
            'bg-lightBlue text-white border-[3px] border-yellow rounded-full text-[2rem]',
            'flex items-center justify-center cursor-pointer',
            'shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]',
            'hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]',
            'active:scale-95',
          )}
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </section>
  );
};
