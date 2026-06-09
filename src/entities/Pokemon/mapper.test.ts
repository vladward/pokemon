import { mapPokemon } from './mapper';

type RawPokemon = Parameters<typeof mapPokemon>[0];

const makeRaw = (overrides: Partial<RawPokemon> = {}): RawPokemon => ({
  id: 1,
  name: 'bulbasaur',
  species_id: 1,
  pokemon_sprite: [
    { sprite_name: 'front_default', url: 'https://sprites/front.png' },
    { sprite_name: 'other_official-artwork_front_default', url: 'https://sprites/artwork.png' },
    { sprite_name: 'other_dream_world_front_default', url: 'https://sprites/dreamworld.png' },
  ],
  pokemon_stat: [
    { stat_name: 'hp', base_stat: 45 },
    { stat_name: 'attack', base_stat: 49 },
    { stat_name: 'defense', base_stat: 49 },
    { stat_name: 'speed', base_stat: 45 },
  ],
  pokemon_type: [{ type: { name: 'grass' } }],
  pokemon_form: [],
  species: {
    generation_id: 1,
    is_mythical: false,
    is_legendary: false,
    capture_rate: 200,
    pokemon_species_name: [],
  },
  ...overrides,
});

const makeSpecies = (
  overrides: Partial<NonNullable<RawPokemon['species']>> = {},
): NonNullable<RawPokemon['species']> => ({
  generation_id: 1,
  is_mythical: false,
  is_legendary: false,
  capture_rate: 200,
  pokemon_species_name: [],
  ...overrides,
});

describe('mapPokemon', () => {
  describe('scalar fields', () => {
    it('maps id directly from the raw row', () => {
      expect(mapPokemon(makeRaw({ id: 42 })).id).toBe(42);
    });

    it('prefers pokemon_form_name over pokemon_species_name', () => {
      const result = mapPokemon(
        makeRaw({
          pokemon_form: [{ pokemon_form_name: [{ name: 'Пикачу Рок Звезда' }] }],
          species: makeSpecies({ pokemon_species_name: [{ name: 'Пикачу' }] }),
        }),
      );
      expect(result.name).toBe('Пикачу Рок Звезда');
    });

    it('uses pokemon_species_name when pokemon_form_name is empty', () => {
      const result = mapPokemon(
        makeRaw({ species: makeSpecies({ pokemon_species_name: [{ name: 'Bulbizarre' }] }) }),
      );
      expect(result.name).toBe('Bulbizarre');
    });

    it('falls back to raw.name when pokemon_species_name is empty', () => {
      const result = mapPokemon(makeRaw({ name: 'bulbasaur' }));
      expect(result.name).toBe('bulbasaur');
    });

    it('falls back to raw.name when species is null', () => {
      const result = mapPokemon(makeRaw({ name: 'bulbasaur', species: null }));
      expect(result.name).toBe('bulbasaur');
    });

    it('maps each pokemon_type entry into the types array', () => {
      const result = mapPokemon(
        makeRaw({ pokemon_type: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }] }),
      );
      expect(result.types).toEqual(['fire', 'flying']);
    });

    it('types is an empty array when pokemon has no type entries', () => {
      const result = mapPokemon(makeRaw({ pokemon_type: [] }));
      expect(result.types).toEqual([]);
    });
  });

  describe('sprites — found by name, not by array position', () => {
    it('returns all three sprite URLs when all three named entries are present', () => {
      const result = mapPokemon(makeRaw());
      expect(result.sprite).toBe('https://sprites/front.png');
      expect(result.spriteArtwork).toBe('https://sprites/artwork.png');
      expect(result.spriteDreamWorld).toBe('https://sprites/dreamworld.png');
    });

    it('matching sprite name with url: null returns null for that slot', () => {
      const result = mapPokemon(
        makeRaw({ pokemon_sprite: [{ sprite_name: 'front_default', url: null }] }),
      );
      expect(result.sprite).toBeNull();
    });
    it('finds front_default regardless of its position in the array', () => {
      const result = mapPokemon(
        makeRaw({
          pokemon_sprite: [
            { sprite_name: 'other_dream_world_front_default', url: 'https://sprites/dw.png' },
            { sprite_name: 'front_default', url: 'https://sprites/front.png' },
          ],
        }),
      );
      expect(result.sprite).toBe('https://sprites/front.png');
    });

    it('when the same name appears twice, the first match wins', () => {
      const result = mapPokemon(
        makeRaw({
          pokemon_sprite: [
            { sprite_name: 'front_default', url: 'https://sprites/first.png' },
            { sprite_name: 'front_default', url: 'https://sprites/second.png' },
          ],
        }),
      );
      expect(result.sprite).toBe('https://sprites/first.png');
    });

    it('null sprite_name never matches any slot — all three sprite fields become null', () => {
      const result = mapPokemon(
        makeRaw({ pokemon_sprite: [{ sprite_name: null, url: 'https://sprites/x.png' }] }),
      );
      expect(result.sprite).toBeNull();
      expect(result.spriteArtwork).toBeNull();
      expect(result.spriteDreamWorld).toBeNull();
    });

    it('each sprite slot is independent — absent names become null without affecting present ones', () => {
      const result = mapPokemon(
        makeRaw({
          pokemon_sprite: [{ sprite_name: 'front_default', url: 'https://sprites/front.png' }],
        }),
      );
      expect(result.sprite).toBe('https://sprites/front.png');
      expect(result.spriteArtwork).toBeNull();
      expect(result.spriteDreamWorld).toBeNull();
    });
  });

  describe('stats — shape invariant and edge cases', () => {
    it('output always has exactly the four expected keys, extra DB stats are dropped', () => {
      const result = mapPokemon(
        makeRaw({
          pokemon_stat: [
            { stat_name: 'hp', base_stat: 80 },
            { stat_name: 'attack', base_stat: 82 },
            { stat_name: 'defense', base_stat: 83 },
            { stat_name: 'special-attack', base_stat: 100 },
            { stat_name: 'special-defense', base_stat: 100 },
            { stat_name: 'speed', base_stat: 80 },
          ],
        }),
      );
      expect(Object.keys(result.stats).sort()).toEqual(['attack', 'defense', 'hp', 'speed']);
      expect(result.stats).toEqual({ hp: 80, attack: 82, defense: 83, speed: 80 });
    });

    it('missing stats default to 0, not undefined', () => {
      const result = mapPokemon(makeRaw({ pokemon_stat: [] }));
      expect(result.stats).toEqual({ hp: 0, attack: 0, defense: 0, speed: 0 });
    });

    it('a real stat value of 0 is preserved, not replaced by the default', () => {
      const result = mapPokemon(makeRaw({ pokemon_stat: [{ stat_name: 'speed', base_stat: 0 }] }));
      expect(result.stats.speed).toBe(0);
    });

    it('when a stat name appears twice, the last value wins (Object.fromEntries semantics)', () => {
      const result = mapPokemon(
        makeRaw({
          pokemon_stat: [
            { stat_name: 'hp', base_stat: 45 },
            { stat_name: 'hp', base_stat: 99 },
          ],
        }),
      );
      expect(result.stats.hp).toBe(99);
    });
  });

  describe('rarity — decision matrix', () => {
    it.each<[boolean | null, boolean | null, number | null, string]>([
      [true, true, 3, 'mythical'],
      [true, false, 3, 'mythical'],
      [true, null, 3, 'mythical'],
      [false, true, 3, 'legendary'],
      [null, true, 3, 'legendary'],
      [false, false, 45, 'rare'],
      [false, false, 46, 'uncommon'],
      [false, false, 100, 'uncommon'],
      [false, false, 101, 'common'],
      [false, false, null, 'common'],
      [false, null, 45, 'rare'],
      [null, false, 45, 'rare'],
      [null, null, 101, 'common'],
    ])(
      'is_mythical=%s, is_legendary=%s, capture_rate=%s → %s',
      (is_mythical, is_legendary, capture_rate, expected) => {
        const result = mapPokemon(
          makeRaw({ species: makeSpecies({ is_mythical, is_legendary, capture_rate }) }),
        );
        expect(result.rarity).toBe(expected);
      },
    );

    it('species: null → common, regardless of everything else', () => {
      expect(mapPokemon(makeRaw({ species: null })).rarity).toBe('common');
    });
  });

  describe('generation and region', () => {
    it.each([
      [1, 'Kanto'],
      [2, 'Johto'],
      [3, 'Hoenn'],
      [4, 'Sinnoh'],
      [5, 'Unova'],
      [6, 'Kalos'],
      [7, 'Alola'],
      [8, 'Galar'],
      [9, 'Paldea'],
    ])('generation_id %i → region %s', (generation_id, region) => {
      const result = mapPokemon(makeRaw({ species: makeSpecies({ generation_id }) }));
      expect(result.generation).toBe(generation_id);
      expect(result.region).toBe(region);
    });

    it('generation_id not in the map → Unknown', () => {
      const result = mapPokemon(makeRaw({ species: makeSpecies({ generation_id: 99 }) }));
      expect(result.region).toBe('Unknown');
    });

    it('generation_id: 0 is falsy — region falls back to Unknown', () => {
      const result = mapPokemon(makeRaw({ species: makeSpecies({ generation_id: 0 }) }));
      expect(result.generation).toBe(0);
      expect(result.region).toBe('Unknown');
    });

    it('species: null → generation null, region Unknown', () => {
      const result = mapPokemon(makeRaw({ species: null }));
      expect(result.generation).toBeNull();
      expect(result.region).toBe('Unknown');
    });
  });

  describe('evolutionStage — keyed by species_id, not pokemon id', () => {
    it('looks up stageMap by species_id, ignoring id', () => {
      const result = mapPokemon(makeRaw({ id: 1, species_id: 3 }), { 1: 'base', 3: 'stage2' });
      expect(result.evolutionStage).toBe('stage2');
    });

    it('species_id absent from stageMap → null', () => {
      const result = mapPokemon(makeRaw({ species_id: 99 }), { 1: 'base' });
      expect(result.evolutionStage).toBeNull();
    });

    it('species_id: null → null, without touching stageMap', () => {
      const result = mapPokemon(makeRaw({ species_id: null }), { 1: 'base' });
      expect(result.evolutionStage).toBeNull();
    });

    it('species_id: 0 — loose != null is true — attempts the stageMap lookup', () => {
      expect(mapPokemon(makeRaw({ species_id: 0 }), { 0: 'base' }).evolutionStage).toBe('base');
      expect(mapPokemon(makeRaw({ species_id: 0 }), {}).evolutionStage).toBeNull();
    });
  });
});
