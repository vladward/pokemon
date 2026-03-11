import { useSyncExternalStore, useCallback, useRef, useMemo } from 'react';

import breakpoints from '@/shared/styles/_breakpoints.module.scss';

type BreakpointKey = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'wide';

type BreakpointsState = Record<BreakpointKey, boolean>;

export const useBreakpoints = (): BreakpointsState => {
  const lastSnapshot = useRef<BreakpointsState>({} as BreakpointsState);

  const queryEntries = useMemo(
    () =>
      Object.entries(breakpoints).map(([key, value]) => ({
        key: key as BreakpointKey,
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

  return useSyncExternalStore(subscribe, getSnapshot, () => ({}) as BreakpointsState);
};
