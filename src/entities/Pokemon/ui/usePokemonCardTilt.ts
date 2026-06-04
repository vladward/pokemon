'use client';

import { useRef } from 'react';

export function usePokemonCardTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(leaveTimerRef.current);
    const card = cardRef.current;
    if (card) card.style.transition = 'transform 0.12s ease-out';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
      const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
      card.style.transition = 'transform 0.08s linear';
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
      card.style.setProperty('--spot-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--spot-y', `${(y / rect.height) * 100}%`);
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    leaveTimerRef.current = setTimeout(() => {
      if (card) card.style.transition = '';
    }, 500);
  };

  return { cardRef, handleMouseEnter, handleMouseMove, handleMouseLeave };
}
