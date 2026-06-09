'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

import { cn } from '@/shared/lib/utils/cn';

interface Props {
  page: number;
  totalPages: number;
  onPendingChange?: (pending: boolean) => void;
}

function buildPageRange(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | '...')[] = [1];

  const left = Math.max(2, page - 1);
  const right = Math.min(totalPages - 1, page + 1);

  if (left > 2) range.push('...');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push('...');

  range.push(totalPages);
  return range;
}

export const Pagination = ({ page, totalPages, onPendingChange }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  if (totalPages <= 1) return null;

  const navigate = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    startTransition(() => router.push(`?${params.toString()}`));
  };

  const pageRange = buildPageRange(page, totalPages);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1">
      <PageButton
        onClick={() => navigate(page - 1)}
        disabled={page <= 1 || isPending}
        label="←"
      />

      {pageRange.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-foreground/40 select-none"
          >
            …
          </span>
        ) : (
          <PageButton
            key={p}
            onClick={() => navigate(p)}
            disabled={isPending}
            label={String(p)}
            active={p === page}
          />
        ),
      )}

      <PageButton
        onClick={() => navigate(page + 1)}
        disabled={page >= totalPages || isPending}
        label="→"
      />
    </nav>
  );
};

interface PageButtonProps {
  onClick: () => void;
  label: string;
  active?: boolean;
  disabled?: boolean;
}

const PageButton = ({ onClick, label, active, disabled }: PageButtonProps) => {
  if (disabled && !active) {
    return (
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-md',
          'text-sm font-bold text-foreground/25 cursor-not-allowed select-none',
        )}
      >
        {label}
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md',
        'text-sm font-bold transition-colors duration-100',
        active
          ? 'bg-yellow text-lightBlue border-[3px] border-lightBlue'
          : 'text-foreground/60 hover:text-foreground hover:bg-secondary',
      )}
    >
      {label}
    </button>
  );
};
