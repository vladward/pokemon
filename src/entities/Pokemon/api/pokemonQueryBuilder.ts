import { PokemonSearchQuery } from '../model/pokemonSearchQuery';

export function buildPokemonWhere(q: PokemonSearchQuery) {
  const conditions: object[] = [];

  if (q.search) {
    conditions.push({ name: { contains: q.search } });
  }

  if (q.types?.length) {
    conditions.push({
      pokemon_type: {
        some: { type: { name: { in: q.types } } },
      },
    });
  }

  if (q.generation?.length) {
    conditions.push({ species: { generation_id: { in: q.generation } } });
  }

  if (q.shape?.length) {
    conditions.push({ species: { shape: { in: q.shape } } });
  }

  if (q.isBaby) {
    conditions.push({ species: { is_baby: true } });
  }

  if (q.locationIds?.length) {
    conditions.push({
      pokemon_encounter: {
        some: {
          location_area: {
            location_id: { in: q.locationIds },
          },
        },
      },
    });
  }

  if (q.colors?.length) {
    conditions.push({ species: { color: { in: q.colors } } });
  }

  if (q.habitat?.length) {
    conditions.push({ species: { habitat: { in: q.habitat } } });
  }

  if (q.rarity?.length) {
    const rarityOr: object[] = [];
    if (q.rarity.includes('legendary')) rarityOr.push({ is_legendary: true });
    if (q.rarity.includes('mythical')) rarityOr.push({ is_mythical: true });
    if (q.rarity.includes('rare')) {
      rarityOr.push({ is_legendary: false, is_mythical: false, capture_rate: { lte: 45 } });
    }
    if (q.rarity.includes('uncommon')) {
      rarityOr.push({
        is_legendary: false,
        is_mythical: false,
        capture_rate: { gt: 45, lte: 100 },
      });
    }
    if (q.rarity.includes('common')) {
      rarityOr.push({
        is_legendary: false,
        is_mythical: false,
        OR: [{ capture_rate: { gt: 100 } }, { capture_rate: null }],
      });
    }
    if (rarityOr.length) {
      conditions.push({ species: { OR: rarityOr } });
    }
  }

  return conditions.length ? { AND: conditions } : {};
}
