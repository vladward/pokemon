import { CSSProperties, useRef, useEffect, useState, ReactNode } from 'react';

import styles from './InfiniteSlider.module.scss';

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
      className={`${styles.slider} ${className}`}
      style={
        {
          '--card-width': `${cardWidth}px`,
          '--gap': `${gap}px`,
        } as CSSProperties
      }
    >
      {title && <h3 className={styles.slider__title}>{title}</h3>}

      <div className={styles.slider__wrapper}>
        <button
          className={`${styles.slider__btn} ${styles.slider__btn_left}`}
          onClick={() => scroll('left')}
        >
          ‹
        </button>

        <div className={styles.slider__container}>
          <div
            className={styles.slider__track}
            ref={scrollRef}
            onScroll={handleInfiniteScroll}
          >
            {infiniteItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={styles.slider__item}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>

        <button
          className={`${styles.slider__btn} ${styles.slider__btn_right}`}
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
    </section>
  );
};
