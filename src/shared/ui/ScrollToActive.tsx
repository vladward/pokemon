'use client';

import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ScrollToActive({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    const el = container?.querySelector<HTMLElement>('[data-current="true"]');
    if (!container || !el) return;
    container.scrollLeft = el.offsetLeft - (container.offsetWidth - el.offsetWidth) / 2;
  }, []);

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}
