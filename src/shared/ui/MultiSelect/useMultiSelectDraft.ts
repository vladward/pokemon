'use client';

import { useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 1200;

export function useMultiSelectDraft(values: string[], onChange: (values: string[]) => void) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(values);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const prevValuesRef = useRef(values);
  useEffect(() => {
    const prev = prevValuesRef.current;
    prevValuesRef.current = values;
    if (open) return;
    const changed = prev.length !== values.length || prev.some((v, i) => v !== values[i]);
    if (changed) setDraft(values);
  }, [values, open]);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const toggle = (value: string) => {
    const next = draft.includes(value) ? draft.filter((v) => v !== value) : [...draft, value];
    setDraft(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(next), DEBOUNCE_MS);
  };

  return { draft, open, setOpen, toggle };
}
