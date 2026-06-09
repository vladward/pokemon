import { db } from '@/shared/db/db';

export async function getPokemonLocations(pokemonId: number, locale: string): Promise<string[]> {
  const rows = await db.$queryRaw<{ name: string }[]>`
    SELECT DISTINCT ln.name
    FROM pokemon_encounter pe
    JOIN location_area la ON pe.area_id = la.id
    JOIN location l ON la.location_id = l.id
    JOIN location_name ln ON l.id = ln.location_id AND ln.language = ${locale}
    WHERE pe.pokemon_id = ${pokemonId}
    ORDER BY ln.name
  `;
  return rows.map((r) => r.name);
}
