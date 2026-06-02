import type {
  EvolutionDetail,
  SpriteEntry,
  TransformedEvolutionChain,
  TransformedPokemon,
  TransformedSpecies,
} from './types';

export function transformPokemon(data: Record<string, unknown>): TransformedPokemon {
  const types = data.types as Array<{ slot: number; type: { name: string; url: string } }>;
  const abilities = data.abilities as Array<{
    slot: number;
    is_hidden: boolean;
    ability: { name: string; url: string };
  }>;
  const stats = data.stats as Array<{
    base_stat: number;
    effort: number;
    stat: { name: string };
  }>;
  const moves = data.moves as Array<{
    move: { name: string; url: string };
    version_group_details: Array<{
      version_group: { name: string; url: string };
      move_learn_method: { name: string };
      level_learned_at: number;
    }>;
  }>;
  const held_items = data.held_items as Array<{
    item: { name: string; url: string };
    version_details: Array<{
      version: { name: string; url: string };
      rarity: number;
    }>;
  }>;
  const game_indices = data.game_indices as Array<{
    game_index: number;
    version: { name: string; url: string };
  }>;
  const forms = data.forms as Array<{ name: string; url: string }>;
  const past_types = data.past_types as Array<{
    generation: { url: string };
    types: Array<{ slot: number; type: { name: string; url: string } | null }>;
  }>;
  const past_abilities = data.past_abilities as Array<{
    generation: { url: string };
    abilities: Array<{
      slot: number;
      is_hidden: boolean;
      ability: { name: string; url: string } | null;
    }>;
  }>;
  const cries = data.cries as { latest?: string; legacy?: string } | undefined;
  const species = data.species as { url: string; name: string } | null | undefined;

  return {
    pokemon: {
      id: data.id as number,
      name: data.name as string,
      base_experience: (data.base_experience as number | null) ?? null,
      height: (data.height as number | null) ?? null,
      weight: (data.weight as number | null) ?? null,
      is_default: data.is_default as boolean,
      order_index: (data.order as number | null) ?? null,
      cry_latest_url: cries?.latest ?? null,
      cry_legacy_url: cries?.legacy ?? null,
      species_id: species ? extractId(species.url) : null,
    },
    species_url: species?.url ?? null,

    types: types.map((t) => ({
      id: extractId(t.type.url),
      name: t.type.name,
      slot: t.slot,
    })),

    abilities: abilities.map((a) => ({
      id: extractId(a.ability.url),
      name: a.ability.name,
      is_hidden: a.is_hidden,
      slot: a.slot,
    })),

    stats: stats.map((s) => ({
      stat_name: s.stat.name,
      base_stat: s.base_stat,
      effort: s.effort,
    })),

    sprites: flattenSprites(data.sprites as Record<string, unknown>),

    moves: moves.flatMap((m) => {
      const moveId = extractId(m.move.url);
      return m.version_group_details.map((vgd) => ({
        move_id: moveId,
        move_name: m.move.name,
        version_group_id: extractId(vgd.version_group.url),
        version_group_name: vgd.version_group.name,
        learn_method: vgd.move_learn_method.name,
        level_learned_at: vgd.level_learned_at,
      }));
    }),

    held_items: held_items.flatMap((hi) => {
      const itemId = extractId(hi.item.url);
      return hi.version_details.map((vd) => ({
        item_id: itemId,
        item_name: hi.item.name,
        version_id: extractId(vd.version.url),
        version_name: vd.version.name,
        rarity: vd.rarity,
      }));
    }),

    game_indices: game_indices.map((gi) => ({
      game_index: gi.game_index,
      version_id: extractId(gi.version.url),
      version_name: gi.version.name,
    })),

    forms: forms.map((f) => ({
      id: extractId(f.url),
      name: f.name,
    })),

    past_types: past_types.flatMap((pt) => {
      const generation_id = extractId(pt.generation.url);
      return pt.types
        .filter((t) => t.type !== null)
        .map((t) => ({
          generation_id,
          slot: t.slot,
          type_id: extractId(t.type!.url),
          type_name: t.type!.name,
        }));
    }),

    past_abilities: past_abilities.flatMap((pa) => {
      const generation_id = extractId(pa.generation.url);
      return pa.abilities
        .filter((a) => a.ability !== null)
        .map((a) => ({
          generation_id,
          slot: a.slot,
          ability_id: extractId(a.ability!.url),
          ability_name: a.ability!.name,
          is_hidden: a.is_hidden,
        }));
    }),
  };
}

export function transformSpecies(data: Record<string, unknown>): TransformedSpecies {
  const egg_groups = data.egg_groups as Array<{ name: string; url: string }>;
  const names = data.names as Array<{ name: string; language: { name: string } }>;
  const genera = data.genera as Array<{ genus: string; language: { name: string } }>;
  const flavor_text_entries = data.flavor_text_entries as Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }>;
  const pokedex_numbers = data.pokedex_numbers as Array<{
    entry_number: number;
    pokedex: { name: string };
  }>;
  const generation = data.generation as { name: string; url: string };
  const color = data.color as { name: string } | null | undefined;
  const shape = data.shape as { name: string } | null | undefined;
  const habitat = data.habitat as { name: string } | null | undefined;
  const growth_rate = data.growth_rate as { name: string } | null | undefined;
  const evolution_chain = data.evolution_chain as { url: string } | null | undefined;

  return {
    species: {
      id: data.id as number,
      name: data.name as string,
      gender_rate: (data.gender_rate as number | null) ?? null,
      capture_rate: (data.capture_rate as number | null) ?? null,
      base_happiness: (data.base_happiness as number | null) ?? null,
      is_baby: data.is_baby as boolean,
      hatch_counter: (data.hatch_counter as number | null) ?? null,
      has_gender_differences: data.has_gender_differences as boolean,
      forms_switchable: data.forms_switchable as boolean,
      is_legendary: data.is_legendary as boolean,
      is_mythical: data.is_mythical as boolean,
      order_index: (data.order as number | null) ?? null,
      generation_id: extractId(generation.url),
      generation_name: generation.name,
      color: color?.name ?? null,
      shape: shape?.name ?? null,
      habitat: habitat?.name ?? null,
      growth_rate: growth_rate?.name ?? null,
      evolution_chain_id: evolution_chain ? extractId(evolution_chain.url) : null,
    },
    egg_groups: egg_groups.map((eg) => ({
      id: extractId(eg.url),
      name: eg.name,
    })),
    names: names.map((n) => ({
      language: n.language.name,
      name: n.name,
    })),
    genera: genera.map((g) => ({
      language: g.language.name,
      genus: g.genus,
    })),
    flavor_texts: flavor_text_entries.map((ft) => ({
      language: ft.language.name,
      game_version: ft.version.name,
      flavor_text: ft.flavor_text.replace(/[\f\n\r]/g, ' ').trim(),
    })),
    pokedex_numbers: pokedex_numbers.map((pn) => ({
      pokedex_name: pn.pokedex.name,
      entry_number: pn.entry_number,
    })),
    evolution_chain_url: evolution_chain?.url ?? null,
  };
}

export function transformEvolutionChain(data: Record<string, unknown>): TransformedEvolutionChain {
  const evolutions: EvolutionDetail[] = [];

  interface ChainNode {
    species: { url: string };
    evolution_details: Array<{
      trigger?: { name: string };
      min_level?: number | null;
      min_happiness?: number | null;
      min_beauty?: number | null;
      min_affection?: number | null;
      needs_overworld_rain?: boolean;
      relative_physical_stats?: number | null;
      time_of_day?: string;
      turn_upside_down?: boolean;
      gender?: number | null;
      item?: { url: string } | null;
      held_item?: { url: string } | null;
      known_move?: { url: string } | null;
      known_move_type?: { url: string } | null;
      location?: { url: string } | null;
      party_species?: { url: string } | null;
      party_type?: { url: string } | null;
      trade_species?: { url: string } | null;
    }>;
    evolves_to: ChainNode[];
  }

  function walk(node: ChainNode, fromSpeciesId: number | null): void {
    const toSpeciesId = extractId(node.species.url);

    if (fromSpeciesId !== null) {
      if (node.evolution_details.length > 0) {
        for (const d of node.evolution_details) {
          evolutions.push({
            chain_id: data.id as number,
            from_species_id: fromSpeciesId,
            to_species_id: toSpeciesId,
            trigger: d.trigger?.name ?? null,
            min_level: d.min_level ?? null,
            min_happiness: d.min_happiness ?? null,
            min_beauty: d.min_beauty ?? null,
            min_affection: d.min_affection ?? null,
            needs_overworld_rain: d.needs_overworld_rain ?? false,
            relative_physical_stats: d.relative_physical_stats ?? null,
            time_of_day: d.time_of_day || null,
            turn_upside_down: d.turn_upside_down ?? false,
            gender: d.gender ?? null,
            item_id: d.item ? extractId(d.item.url) : null,
            held_item_id: d.held_item ? extractId(d.held_item.url) : null,
            known_move_id: d.known_move ? extractId(d.known_move.url) : null,
            known_move_type_id: d.known_move_type ? extractId(d.known_move_type.url) : null,
            location_id: d.location ? extractId(d.location.url) : null,
            party_species_id: d.party_species ? extractId(d.party_species.url) : null,
            party_type_id: d.party_type ? extractId(d.party_type.url) : null,
            trade_species_id: d.trade_species ? extractId(d.trade_species.url) : null,
          });
        }
      } else {
        evolutions.push({
          chain_id: data.id as number,
          from_species_id: fromSpeciesId,
          to_species_id: toSpeciesId,
          trigger: null,
          min_level: null,
          min_happiness: null,
          min_beauty: null,
          min_affection: null,
          needs_overworld_rain: false,
          relative_physical_stats: null,
          time_of_day: null,
          turn_upside_down: false,
          gender: null,
          item_id: null,
          held_item_id: null,
          known_move_id: null,
          known_move_type_id: null,
          location_id: null,
          party_species_id: null,
          party_type_id: null,
          trade_species_id: null,
        });
      }
    }

    for (const child of node.evolves_to) {
      walk(child, toSpeciesId);
    }
  }

  walk(data.chain as ChainNode, null);

  const babyTriggerItem = data.baby_trigger_item as { url: string } | null | undefined;

  return {
    chain: {
      id: data.id as number,
      baby_trigger_item_id: babyTriggerItem ? extractId(babyTriggerItem.url) : null,
    },
    evolutions,
  };
}

function flattenSprites(obj: Record<string, unknown>, prefix = ''): SpriteEntry[] {
  const result: SpriteEntry[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (typeof value === 'string') {
      result.push({ sprite_name: prefix ? `${prefix}${key}` : key, url: value });
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      result.push(
        ...flattenSprites(
          value as Record<string, unknown>,
          prefix ? `${prefix}${key}_` : `${key}_`,
        ),
      );
    }
  }
  return result;
}

function extractId(url: string): number {
  return Number(url.split('/').filter(Boolean).pop());
}
