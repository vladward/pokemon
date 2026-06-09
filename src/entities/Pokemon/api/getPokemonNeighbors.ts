import { db } from '@/shared/db/db';

export async function getPokemonNeighbors(
  id: number,
): Promise<{ prevId: number | null; nextId: number | null }> {
  const [prev, next] = await Promise.all([
    db.pokemon.findFirst({
      where: { id: { lt: id } },
      orderBy: { id: 'desc' },
      select: { id: true },
    }),
    db.pokemon.findFirst({
      where: { id: { gt: id } },
      orderBy: { id: 'asc' },
      select: { id: true },
    }),
  ]);

  return { prevId: prev?.id ?? null, nextId: next?.id ?? null };
}
