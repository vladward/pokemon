'use client';

import { createContext, useContext, useState } from 'react';

interface PendingContextValue {
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
}

const PendingContext = createContext<PendingContextValue | null>(null);

export const PendingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, setIsPending] = useState(false);

  return (
    <PendingContext.Provider value={{ isPending, setIsPending }}>
      {children}
    </PendingContext.Provider>
  );
};

export const usePending = (): PendingContextValue => {
  const ctx = useContext(PendingContext);
  if (!ctx) throw new Error('usePending must be used within PendingProvider');
  return ctx;
};
