'use client';

import { useSyncExternalStore, useCallback, useRef, useMemo } from 'react';

const BREAKPOINTS = {
  mobile: '576px',
  tablet: '768px',
  laptop: '992px',
  desktop: '1200px',
  wide: '1400px',
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;
type BreakpointsState = Record<BreakpointKey, boolean>;

const SERVER_SNAPSHOT: BreakpointsState = {
  mobile: false,
  tablet: false,
  laptop: false,
  desktop: false,
  wide: false,
};

export const useBreakpoints = (): BreakpointsState => {
  const lastSnapshot = useRef<BreakpointsState>({} as BreakpointsState);

  const queryEntries = useMemo(
    () =>
      (Object.entries(BREAKPOINTS) as [BreakpointKey, string][]).map(([key, value]) => ({
        key,
        query: `(max-width: ${value})`,
      })),
    [],
  );

  const subscribe = useCallback(
    (callback: () => void) => {
      const matchers = queryEntries.map(({ query }) => window.matchMedia(query));
      matchers.forEach((m) => m.addEventListener('change', callback));
      return () => {
        matchers.forEach((m) => m.removeEventListener('change', callback));
      };
    },
    [queryEntries],
  );

  const getSnapshot = (): BreakpointsState => {
    const nextSnapshot = queryEntries.reduce((acc, { key, query }) => {
      acc[key] = window.matchMedia(query).matches;
      return acc;
    }, {} as BreakpointsState);

    const isChanged = (Object.keys(nextSnapshot) as BreakpointKey[]).some(
      (key) => nextSnapshot[key] !== lastSnapshot.current[key],
    );

    if (isChanged) {
      lastSnapshot.current = nextSnapshot;
    }

    return lastSnapshot.current;
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
};
