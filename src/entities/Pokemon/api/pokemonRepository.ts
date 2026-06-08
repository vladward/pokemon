import { Prisma } from '@prisma/client';

import { db } from '@/shared/db/db';

import { POKEMON_PAGE_SIZE } from '../config/pagination';
import { EvolutionStage, PokemonSearchQuery } from '../model/pokemonSearchQuery';

import { buildPokemonWhere } from './pokemonQueryBuilder';

async function getEvolutionStageSpeciesIds(stage: EvolutionStage): Promise<number[]> {
  if (stage === 'base') {
    const rows = await db.$queryRaw<{ id: number }[]>`
            SELECT id
            FROM pokemon_species
            WHERE id NOT IN (SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL)
        `;
    return rows.map((r) => r.id);
  }

  if (stage === 'stage1') {
    const rows = await db.$queryRaw<{ id: number }[]>`
            SELECT DISTINCT to_species_id AS id
            FROM pokemon_evolution
            WHERE to_species_id IS NOT NULL
              AND from_species_id NOT IN
                  (SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL)
        `;
    return rows.map((r) => r.id);
  }

  const rows = await db.$queryRaw<{ id: number }[]>`
        SELECT DISTINCT to_species_id AS id
        FROM pokemon_evolution
        WHERE to_species_id IS NOT NULL
          AND from_species_id IN (SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL)
    `;
  return rows.map((r) => r.id);
}

export async function findPokemon(query: PokemonSearchQuery) {
  const page = query.page ?? 1;

  const evolutionSpeciesIds = query.evolutionStage?.length
    ? (await Promise.all(query.evolutionStage.map(getEvolutionStageSpeciesIds)))
        .flat()
        .filter((v, i, a) => a.indexOf(v) === i)
    : undefined;

  const where = buildPokemonWhere(query, evolutionSpeciesIds);

  const [items, total] = await Promise.all([
    db.pokemon.findMany({
      where,
      include: {
        pokemon_form: {
          take: 1,
          include: {
            pokemon_form_name: {
              where: { language: query.searchLocale ?? 'en' },
              take: 1,
            },
          },
        },
        species: {
          include: {
            pokemon_species_name: {
              where: { language: query.searchLocale ?? 'en' },
              take: 1,
            },
          },
        },
        pokemon_type: { include: { type: true }, orderBy: { slot: 'asc' } },
        pokemon_stat: true,
        pokemon_sprite: true,
      },
      orderBy: { [query.sortBy ?? 'id']: query.sortOrder ?? 'asc' },
      take: POKEMON_PAGE_SIZE,
      skip: (page - 1) * POKEMON_PAGE_SIZE,
    }),
    db.pokemon.count({ where }),
  ]);

  const speciesIds = items.map((p) => p.species_id).filter((id): id is number => id !== null);

  const stageMap: Record<number, 'base' | 'stage1' | 'stage2'> = {};

  if (speciesIds.length > 0) {
    const rows = await db.$queryRaw<{ id: number; evolution_stage: string }[]>`
            SELECT ps.id,
                   CASE
                       WHEN ps.id NOT IN
                            (SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL)
                           THEN 'base'
                       WHEN (SELECT from_species_id
                             FROM pokemon_evolution
                             WHERE to_species_id = ps.id LIMIT 1 ) IN (
            SELECT DISTINCT to_species_id FROM pokemon_evolution WHERE to_species_id IS NOT NULL
          ) THEN 'stage2'
          ELSE 'stage1'
            END
            AS evolution_stage
      FROM pokemon_species ps
      WHERE ps.id IN (
            ${Prisma.join(speciesIds)}
            )
        `;
    for (const row of rows) {
      stageMap[row.id] = row.evolution_stage as 'base' | 'stage1' | 'stage2';
    }
  }

  return { items, total, page, stageMap };
}
