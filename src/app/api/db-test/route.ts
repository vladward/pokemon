import { RowDataPacket } from 'mysql2';

import { db } from '../../../../lib/db';

interface CountRow extends RowDataPacket {
  n: number;
}

interface LangRow extends RowDataPacket {
  language: string;
  n: number;
}

interface SeedStateRow extends RowDataPacket {
  id: string;
  value: number;
}

export async function GET() {
  const counts = await Promise.all([
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM pokemon'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM pokemon_species'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM move'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM ability'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM item'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM type'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM pokemon_move'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM pokemon_sprite'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM pokemon_encounter'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM evolution_chain'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM machine'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM berry'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM location'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM nature'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM generation'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM pokemon_species_flavor_text'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM move_flavor_text'),
    db.query<CountRow[]>('SELECT COUNT(*) AS n FROM item_flavor_text'),
  ]);

  const [
    [pokemon],
    [species],
    [moves],
    [abilities],
    [items],
    [types],
    [pokemonMoves],
    [sprites],
    [encounters],
    [evolutionChains],
    [machines],
    [berries],
    [locations],
    [natures],
    [generations],
    [flavorTexts],
    [moveFlavors],
    [itemFlavors],
  ] = counts.map(([rows]) => [rows[0].n]);

  const [langRows] = await db.query<LangRow[]>(`
        SELECT language, COUNT (*) AS n
        FROM pokemon_species_name
        GROUP BY language
        ORDER BY n DESC
    `);

  const [seedRows] = await db.query<SeedStateRow[]>('SELECT id, value FROM seed_state ORDER BY id');

  return Response.json({
    tables: {
      pokemon,
      pokemon_species: species,
      moves,
      abilities,
      items,
      types,
      pokemon_moves: pokemonMoves,
      pokemon_sprites: sprites,
      pokemon_encounters: encounters,
      evolution_chains: evolutionChains,
      machines,
      berries,
      locations,
      natures,
      generations,
    },
    flavor_texts: {
      pokemon_species: flavorTexts,
      moves: moveFlavors,
      items: itemFlavors,
    },
    languages_in_species_name: Object.fromEntries(langRows.map((r) => [r.language, r.n])),
    seed_state: Object.fromEntries(seedRows.map((r) => [r.id, r.value])),
  });
}
