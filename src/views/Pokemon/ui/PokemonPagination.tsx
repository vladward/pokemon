'use client';

import { Pagination } from '@/shared/ui';

import { usePending } from '../lib/PendingContext';

interface Props {
  page: number;
  totalPages: number;
}

export const PokemonPagination = ({ page, totalPages }: Props) => {
  const { setIsPending } = usePending();
  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPendingChange={setIsPending}
    />
  );
};
