import type { RowDataPacket } from 'mysql2';
import pLimit from 'p-limit';

import { db } from '../lib/db';

import { loadEvolutionChain, loadPokemon, loadPokemonList, loadSpecies } from './pokemon.loader';
import { transformEvolutionChain, transformPokemon, transformSpecies } from './pokemon.transformer';
import type { TransformedEvolutionChain, TransformedPokemon, TransformedSpecies } from './types';

const limitReq = pLimit(5);

const typeCache = new Set<number>();
const abilityCache = new Set<number>();
const moveCache = new Set<number>();
const versionGroupCache = new Set<number>();
const itemCache = new Set<number>();
const versionCache = new Set<number>();
const generationCache = new Set<number>();
const eggGroupCache = new Set<number>();
const speciesCache = new Set<number>();
const evolutionChainProcessed = new Set<number>();

const BATCH_SIZE = 50;
const STATE_ID = 'pokemon_offset';

async function getState(): Promise<number> {
  const [rows] = await db.query<(RowDataPacket & { value: number })[]>(
    'SELECT value FROM seed_state WHERE id = ?',
    [STATE_ID],
  );
  if (!rows.length) return 0;
  return rows[0].value;
}

export async function runPokemon(): Promise<void> {
  const first = await loadPokemonList(1, 0);
  const total = first.count as number;
  console.log('Total:', total);

  let offset = await getState();
  console.log('Resume from:', offset);

  for (; offset < total; offset += BATCH_SIZE) {
    console.log(`\nBatch: ${offset}`);

    const list = await loadPokemonList(BATCH_SIZE, offset);
    const listResults = list.results as Array<{ name: string; url: string }>;
    const pokemonResults = await Promise.allSettled(
      listResults.map((item) => limitReq(() => loadPokemon(item.url))),
    );

    const pokemonData: Record<string, unknown>[] = [];
    for (const r of pokemonResults) {
      if (r.status === 'fulfilled') pokemonData.push(r.value);
      else console.log('Failed pokemon fetch:', r.reason);
    }

    if (!pokemonData.length) continue;

    const speciesUrlMap = new Map<string, number>();
    for (const data of pokemonData) {
      const species = data.species as { url: string } | null | undefined;
      if (species?.url) speciesUrlMap.set(species.url, 0);
    }

    const speciesResults = await Promise.allSettled(
      [...speciesUrlMap.keys()].map((url) => limitReq(() => loadSpecies(url))),
    );

    const speciesDataMap = new Map<number, Record<string, unknown>>();
    for (const r of speciesResults) {
      if (r.status === 'fulfilled') {
        speciesDataMap.set(r.value.id as number, r.value);
      } else {
        console.log('Failed species fetch:', r.reason);
      }
    }

    const chainUrls = new Map<number, string>();
    for (const speciesData of speciesDataMap.values()) {
      const evo = speciesData.evolution_chain as { url: string } | null | undefined;
      if (evo?.url) {
        const chainId = Number(evo.url.split('/').filter(Boolean).pop());
        if (!evolutionChainProcessed.has(chainId)) {
          chainUrls.set(chainId, evo.url);
        }
      }
    }

    const chainResults = await Promise.allSettled(
      [...chainUrls.entries()].map(([, url]) => limitReq(() => loadEvolutionChain(url))),
    );

    const chainDataMap = new Map<number, Record<string, unknown>>();
    for (const r of chainResults) {
      if (r.status === 'fulfilled') chainDataMap.set(r.value.id as number, r.value);
      else console.log('Failed chain fetch:', r.reason);
    }

    const transformed: TransformedPokemon[] = pokemonData.map((d) => transformPokemon(d));
    const transformedSpeciesList: TransformedSpecies[] = [...speciesDataMap.values()].map((d) =>
      transformSpecies(d),
    );
    const transformedChains: TransformedEvolutionChain[] = [...chainDataMap.values()].map((d) =>
      transformEvolutionChain(d),
    );

    const generationRows: [number, string][] = [];
    const evolutionChainRows: [number, number | null][] = [];
    const evolutionRows: [
      number,
      number,
      number,
      string | null,
      number | null,
      number | null,
      number | null,
      number | null,
      boolean,
      number | null,
      string | null,
      boolean,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
      number | null,
    ][] = [];
    const pokemonSpeciesRows: [
      number,
      string,
      number | null,
      number | null,
      number | null,
      boolean,
      number | null,
      boolean,
      boolean,
      boolean,
      boolean,
      number | null,
      number,
      string | null,
      string | null,
      string | null,
      string | null,
      number | null,
    ][] = [];
    const eggGroupRows: [number, string][] = [];
    const speciesEggGroupRows: [number, number][] = [];
    const speciesNameRows: [number, string, string][] = [];
    const speciesGenusRows: [number, string, string][] = [];
    const flavorTextRows: [number, string, string, string][] = [];
    const pokedexNumberRows: [number, string, number][] = [];

    for (const ts of transformedSpeciesList) {
      if (speciesCache.has(ts.species.id)) continue;
      speciesCache.add(ts.species.id);

      const genId = ts.species.generation_id;
      if (!generationCache.has(genId)) {
        generationRows.push([genId, ts.species.generation_name]);
        generationCache.add(genId);
      }

      pokemonSpeciesRows.push([
        ts.species.id,
        ts.species.name,
        ts.species.gender_rate,
        ts.species.capture_rate,
        ts.species.base_happiness,
        ts.species.is_baby,
        ts.species.hatch_counter,
        ts.species.has_gender_differences,
        ts.species.forms_switchable,
        ts.species.is_legendary,
        ts.species.is_mythical,
        ts.species.order_index,
        ts.species.generation_id,
        ts.species.color,
        ts.species.shape,
        ts.species.habitat,
        ts.species.growth_rate,
        ts.species.evolution_chain_id,
      ]);

      for (const eg of ts.egg_groups) {
        if (!eggGroupCache.has(eg.id)) {
          eggGroupRows.push([eg.id, eg.name]);
          eggGroupCache.add(eg.id);
        }
        speciesEggGroupRows.push([ts.species.id, eg.id]);
      }
      for (const n of ts.names) speciesNameRows.push([ts.species.id, n.language, n.name]);
      for (const g of ts.genera) speciesGenusRows.push([ts.species.id, g.language, g.genus]);
      for (const ft of ts.flavor_texts)
        flavorTextRows.push([ts.species.id, ft.language, ft.game_version, ft.flavor_text]);
      for (const pn of ts.pokedex_numbers)
        pokedexNumberRows.push([ts.species.id, pn.pokedex_name, pn.entry_number]);
    }

    for (const tc of transformedChains) {
      evolutionChainRows.push([tc.chain.id, tc.chain.baby_trigger_item_id]);
      for (const ev of tc.evolutions) {
        evolutionRows.push([
          ev.chain_id,
          ev.from_species_id,
          ev.to_species_id,
          ev.trigger,
          ev.min_level,
          ev.min_happiness,
          ev.min_beauty,
          ev.min_affection,
          ev.needs_overworld_rain,
          ev.relative_physical_stats,
          ev.time_of_day,
          ev.turn_upside_down,
          ev.gender,
          ev.item_id,
          ev.held_item_id,
          ev.known_move_id,
          ev.known_move_type_id,
          ev.location_id,
          ev.party_species_id,
          ev.party_type_id,
          ev.trade_species_id,
        ]);
      }
    }

    const pokemonRows: [
      number,
      string,
      number | null,
      number | null,
      number | null,
      boolean,
      number | null,
      string | null,
      string | null,
      number | null,
    ][] = [];
    const typeRows: [number, string][] = [];
    const abilityRows: [number, string][] = [];
    const pokemonTypeRows: [number, number, number][] = [];
    const pokemonAbilityRows: [number, number, boolean, number][] = [];
    const statRows: [number, string, number, number][] = [];
    const spriteRows: [number, string, string][] = [];
    const moveRows: [number, string][] = [];
    const versionGroupRows: [number, string][] = [];
    const pokemonMoveRows: [number, number, number, string, number][] = [];
    const itemRows: [number, string][] = [];
    const versionRows: [number, string][] = [];
    const heldItemRows: [number, number, number, number][] = [];
    const gameIndexRows: [number, number, number][] = [];
    const formRows: [number, number, string][] = [];
    const pastTypeRows: [number, number, number, number][] = [];
    const pastAbilityRows: [number, number, number, number, boolean][] = [];

    for (const t of transformed) {
      const p = t.pokemon;
      pokemonRows.push([
        p.id,
        p.name,
        p.base_experience,
        p.height,
        p.weight,
        p.is_default,
        p.order_index,
        p.cry_latest_url,
        p.cry_legacy_url,
        p.species_id,
      ]);

      for (const type of t.types) {
        if (!typeCache.has(type.id)) {
          typeRows.push([type.id, type.name]);
          typeCache.add(type.id);
        }
        pokemonTypeRows.push([p.id, type.id, type.slot]);
      }
      for (const ab of t.abilities) {
        if (!abilityCache.has(ab.id)) {
          abilityRows.push([ab.id, ab.name]);
          abilityCache.add(ab.id);
        }
        pokemonAbilityRows.push([p.id, ab.id, ab.is_hidden, ab.slot]);
      }
      for (const s of t.stats) statRows.push([p.id, s.stat_name, s.base_stat, s.effort]);
      for (const sp of t.sprites) spriteRows.push([p.id, sp.sprite_name, sp.url]);
      for (const m of t.moves) {
        if (!moveCache.has(m.move_id)) {
          moveRows.push([m.move_id, m.move_name]);
          moveCache.add(m.move_id);
        }
        if (!versionGroupCache.has(m.version_group_id)) {
          versionGroupRows.push([m.version_group_id, m.version_group_name]);
          versionGroupCache.add(m.version_group_id);
        }
        pokemonMoveRows.push([
          p.id,
          m.move_id,
          m.version_group_id,
          m.learn_method,
          m.level_learned_at,
        ]);
      }
      for (const hi of t.held_items) {
        if (!itemCache.has(hi.item_id)) {
          itemRows.push([hi.item_id, hi.item_name]);
          itemCache.add(hi.item_id);
        }
        if (!versionCache.has(hi.version_id)) {
          versionRows.push([hi.version_id, hi.version_name]);
          versionCache.add(hi.version_id);
        }
        heldItemRows.push([p.id, hi.item_id, hi.version_id, hi.rarity]);
      }
      for (const gi of t.game_indices) {
        if (!versionCache.has(gi.version_id)) {
          versionRows.push([gi.version_id, gi.version_name]);
          versionCache.add(gi.version_id);
        }
        gameIndexRows.push([p.id, gi.game_index, gi.version_id]);
      }
      for (const f of t.forms) formRows.push([f.id, p.id, f.name]);
      for (const pt of t.past_types) {
        if (!generationCache.has(pt.generation_id)) {
          generationRows.push([pt.generation_id, `generation-${pt.generation_id}`]);
          generationCache.add(pt.generation_id);
        }
        if (!typeCache.has(pt.type_id)) {
          typeRows.push([pt.type_id, pt.type_name]);
          typeCache.add(pt.type_id);
        }
        pastTypeRows.push([p.id, pt.generation_id, pt.slot, pt.type_id]);
      }
      for (const pa of t.past_abilities) {
        if (!generationCache.has(pa.generation_id)) {
          generationRows.push([pa.generation_id, `generation-${pa.generation_id}`]);
          generationCache.add(pa.generation_id);
        }
        if (!abilityCache.has(pa.ability_id)) {
          abilityRows.push([pa.ability_id, pa.ability_name]);
          abilityCache.add(pa.ability_id);
        }
        pastAbilityRows.push([p.id, pa.generation_id, pa.slot, pa.ability_id, pa.is_hidden]);
      }
    }

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      if (generationRows.length)
        await conn.query(
          'INSERT INTO generation (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [generationRows],
        );

      if (evolutionChainRows.length)
        await conn.query(
          'INSERT INTO evolution_chain (id, baby_trigger_item_id) VALUES ? ON DUPLICATE KEY UPDATE baby_trigger_item_id = VALUES(baby_trigger_item_id)',
          [evolutionChainRows],
        );

      if (pokemonSpeciesRows.length)
        await conn.query(
          `INSERT INTO pokemon_species
                     (id, name, gender_rate, capture_rate, base_happiness, is_baby, hatch_counter,
                      has_gender_differences, forms_switchable, is_legendary, is_mythical, order_index,
                      generation_id, color, shape, habitat, growth_rate, evolution_chain_id)
                     VALUES ? ON DUPLICATE KEY
                    UPDATE
                        name =
                    VALUES (name), gender_rate =
                    VALUES (gender_rate), capture_rate =
                    VALUES (capture_rate), base_happiness =
                    VALUES (base_happiness), is_baby =
                    VALUES (is_baby), hatch_counter =
                    VALUES (hatch_counter), has_gender_differences =
                    VALUES (has_gender_differences), forms_switchable =
                    VALUES (forms_switchable), is_legendary =
                    VALUES (is_legendary), is_mythical =
                    VALUES (is_mythical), order_index =
                    VALUES (order_index), generation_id =
                    VALUES (generation_id), color =
                    VALUES (color), shape =
                    VALUES (shape), habitat =
                    VALUES (habitat), growth_rate =
                    VALUES (growth_rate), evolution_chain_id =
                    VALUES (evolution_chain_id)`,
          [pokemonSpeciesRows],
        );

      if (eggGroupRows.length)
        await conn.query(
          'INSERT INTO egg_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [eggGroupRows],
        );

      if (speciesEggGroupRows.length)
        await conn.query(
          'INSERT IGNORE INTO pokemon_species_egg_group (species_id, egg_group_id) VALUES ?',
          [speciesEggGroupRows],
        );

      if (speciesNameRows.length)
        await conn.query(
          'INSERT INTO pokemon_species_name (species_id, language, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [speciesNameRows],
        );

      if (speciesGenusRows.length)
        await conn.query(
          'INSERT INTO pokemon_species_genus (species_id, language, genus) VALUES ? ON DUPLICATE KEY UPDATE genus = VALUES(genus)',
          [speciesGenusRows],
        );

      if (flavorTextRows.length)
        await conn.query(
          'INSERT INTO pokemon_species_flavor_text (species_id, language, game_version, flavor_text) VALUES ? ON DUPLICATE KEY UPDATE flavor_text = VALUES(flavor_text)',
          [flavorTextRows],
        );

      if (pokedexNumberRows.length)
        await conn.query(
          'INSERT INTO pokemon_pokedex_number (species_id, pokedex_name, entry_number) VALUES ? ON DUPLICATE KEY UPDATE entry_number = VALUES(entry_number)',
          [pokedexNumberRows],
        );

      if (transformedChains.length) {
        const chainIds = transformedChains.map((tc) => tc.chain.id);
        await conn.query('DELETE FROM pokemon_evolution WHERE chain_id IN (?)', [chainIds]);
        for (const id of chainIds) evolutionChainProcessed.add(id);
      }
      if (evolutionRows.length)
        await conn.query(
          `INSERT INTO pokemon_evolution
                     (chain_id, from_species_id, to_species_id, \`trigger\`, min_level, min_happiness,
                      min_beauty, min_affection, needs_overworld_rain, relative_physical_stats, time_of_day,
                      turn_upside_down, gender, item_id, held_item_id, known_move_id, known_move_type_id,
                      location_id, party_species_id, party_type_id, trade_species_id)
                     VALUES ?`,
          [evolutionRows],
        );

      if (typeRows.length)
        await conn.query(
          'INSERT INTO `type` (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [typeRows],
        );

      if (abilityRows.length)
        await conn.query(
          'INSERT INTO ability (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [abilityRows],
        );

      if (moveRows.length)
        await conn.query(
          'INSERT INTO move (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [moveRows],
        );

      if (versionGroupRows.length)
        await conn.query(
          'INSERT INTO version_group (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [versionGroupRows],
        );

      if (itemRows.length)
        await conn.query(
          'INSERT INTO item (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [itemRows],
        );

      if (versionRows.length)
        await conn.query(
          'INSERT INTO version (id, name) VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)',
          [versionRows],
        );

      if (pokemonRows.length)
        await conn.query(
          `INSERT INTO pokemon
                     (id, name, base_experience, height, weight, is_default, order_index,
                      cry_latest_url, cry_legacy_url, species_id)
                     VALUES ? ON DUPLICATE KEY
                    UPDATE
                        name =
                    VALUES (name), base_experience =
                    VALUES (base_experience), height =
                    VALUES (height), weight =
                    VALUES (weight), is_default =
                    VALUES (is_default), order_index =
                    VALUES (order_index), cry_latest_url =
                    VALUES (cry_latest_url), cry_legacy_url =
                    VALUES (cry_legacy_url), species_id =
                    VALUES (species_id)`,
          [pokemonRows],
        );

      if (pokemonTypeRows.length)
        await conn.query('INSERT IGNORE INTO pokemon_type (pokemon_id, type_id, slot) VALUES ?', [
          pokemonTypeRows,
        ]);

      if (pokemonAbilityRows.length)
        await conn.query(
          'INSERT IGNORE INTO pokemon_ability (pokemon_id, ability_id, is_hidden, slot) VALUES ?',
          [pokemonAbilityRows],
        );

      if (statRows.length)
        await conn.query(
          'INSERT INTO pokemon_stat (pokemon_id, stat_name, base_stat, effort) VALUES ? ON DUPLICATE KEY UPDATE base_stat = VALUES(base_stat), effort = VALUES(effort)',
          [statRows],
        );

      if (spriteRows.length)
        await conn.query(
          'INSERT INTO pokemon_sprite (pokemon_id, sprite_name, url) VALUES ? ON DUPLICATE KEY UPDATE url = VALUES(url)',
          [spriteRows],
        );

      if (pokemonMoveRows.length)
        await conn.query(
          'INSERT INTO pokemon_move (pokemon_id, move_id, version_group_id, learn_method, level_learned_at) VALUES ? ON DUPLICATE KEY UPDATE level_learned_at = VALUES(level_learned_at)',
          [pokemonMoveRows],
        );

      if (heldItemRows.length)
        await conn.query(
          'INSERT INTO pokemon_held_item (pokemon_id, item_id, version_id, rarity) VALUES ? ON DUPLICATE KEY UPDATE rarity = VALUES(rarity)',
          [heldItemRows],
        );

      if (gameIndexRows.length)
        await conn.query(
          'INSERT INTO pokemon_game_index (pokemon_id, game_index, version_id) VALUES ? ON DUPLICATE KEY UPDATE game_index = VALUES(game_index)',
          [gameIndexRows],
        );

      if (formRows.length)
        await conn.query('INSERT IGNORE INTO pokemon_form (id, pokemon_id, form_name) VALUES ?', [
          formRows,
        ]);

      if (pastTypeRows.length)
        await conn.query(
          'INSERT INTO pokemon_past_type (pokemon_id, generation_id, slot, type_id) VALUES ? ON DUPLICATE KEY UPDATE type_id = VALUES(type_id)',
          [pastTypeRows],
        );

      if (pastAbilityRows.length)
        await conn.query(
          'INSERT INTO pokemon_past_ability (pokemon_id, generation_id, slot, ability_id, is_hidden) VALUES ? ON DUPLICATE KEY UPDATE ability_id = VALUES(ability_id), is_hidden = VALUES(is_hidden)',
          [pastAbilityRows],
        );

      await conn.query(
        'INSERT INTO seed_state (id, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
        [STATE_ID, offset + BATCH_SIZE],
      );

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    console.log(`Batch done: ${offset}`);
  }

  console.log('DONE ALL POKEMON');
}
