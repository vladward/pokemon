'use client';

import type { CSSProperties } from 'react';

import { useTilt } from './useTilt';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const TiltWrapper = ({ children, className, style }: Props) => {
  const { cardRef, handleMouseEnter, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};
