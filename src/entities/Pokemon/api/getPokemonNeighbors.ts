import { unstable_cache } from 'next/cache';

import { db } from '@/shared/db/db';

async function fetchPokemonNeighbors(
  id: number,
): Promise<{ prevId: number | null; nextId: number | null }> {
  const [row] = await db.$queryRaw<{ prev_id: number | null; next_id: number | null }[]>`
    SELECT
      (SELECT id FROM pokemon WHERE id < ${id} ORDER BY id DESC LIMIT 1) AS prev_id,
      (SELECT id FROM pokemon WHERE id > ${id} ORDER BY id ASC  LIMIT 1) AS next_id
  `;
  return { prevId: row?.prev_id ?? null, nextId: row?.next_id ?? null };
}

export const getPokemonNeighbors = unstable_cache(
  fetchPokemonNeighbors,
  ['pokemon-neighbors'],
  { revalidate: false },
);
