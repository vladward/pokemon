import { buildPokemonWhere } from './pokemonQueryBuilder';

function rarityBranches(rarity: string[]) {
  const result = buildPokemonWhere({ rarity }) as { AND: [{ species: { OR: object[] } }] };
  return result.AND[0].species.OR;
}

describe('buildPokemonWhere', () => {
  describe('returns {} when no conditions are active', () => {
    it.each([
      ['empty query object', {}],
      ['search is empty string', { search: '' }],
      ['isBaby is false', { isBaby: false }],
      ['types is empty array', { types: [] }],
      ['generation is empty array', { generation: [] }],
      ['rarity is empty array', { rarity: [] }],
      ['colors is empty array', { colors: [] }],
      ['habitat is empty array', { habitat: [] }],
      ['shape is empty array', { shape: [] }],
      ['locationIds is empty array', { locationIds: [] }],
    ])('%s', (_, query) => {
      expect(buildPokemonWhere(query)).toEqual({});
    });
  });

  describe('single active filter — exact AND clause', () => {
    it.each([
      [
        'search without locale defaults to en',
        { search: 'char' },
        {
          OR: [
            {
              species: {
                pokemon_species_name: { some: { language: 'en', name: { contains: 'char' } } },
              },
            },
            {
              pokemon_form: {
                some: {
                  pokemon_form_name: { some: { language: 'en', name: { contains: 'char' } } },
                },
              },
            },
          ],
        },
      ],
      [
        'search with explicit locale uses that locale',
        { search: 'bulbi', searchLocale: 'fr' as const },
        {
          OR: [
            {
              species: {
                pokemon_species_name: { some: { language: 'fr', name: { contains: 'bulbi' } } },
              },
            },
            {
              pokemon_form: {
                some: {
                  pokemon_form_name: { some: { language: 'fr', name: { contains: 'bulbi' } } },
                },
              },
            },
          ],
        },
      ],
      [
        'types',
        { types: ['fire'] },
        { pokemon_type: { some: { type: { name: { in: ['fire'] } } } } },
      ],
      ['generation', { generation: [1] }, { species: { generation_id: { in: [1] } } }],
      ['shape', { shape: ['quadruped'] }, { species: { shape: { in: ['quadruped'] } } }],
      ['colors', { colors: ['red'] }, { species: { color: { in: ['red'] } } }],
      ['habitat', { habitat: ['mountain'] }, { species: { habitat: { in: ['mountain'] } } }],
      ['isBaby', { isBaby: true }, { species: { is_baby: true } }],
    ])('%s produces the expected AND condition', (_, query, expected) => {
      const result = buildPokemonWhere(query) as { AND: object[] };
      expect(result.AND).toEqual([expected]);
    });

    it('locationIds produces a pokemon_encounter.some condition', () => {
      const result = buildPokemonWhere({ locationIds: [1, 2, 3] }) as { AND: object[] };
      expect(result.AND).toEqual([
        {
          pokemon_encounter: {
            some: { location_area: { location_id: { in: [1, 2, 3] } } },
          },
        },
      ]);
    });

    it('array filters pass all values into the in clause', () => {
      const result = buildPokemonWhere({
        types: ['fire', 'water'],
        generation: [1, 2, 3],
      }) as { AND: object[] };

      expect(result.AND).toContainEqual({
        pokemon_type: { some: { type: { name: { in: ['fire', 'water'] } } } },
      });
      expect(result.AND).toContainEqual({
        species: { generation_id: { in: [1, 2, 3] } },
      });
    });
  });

  describe('evolutionSpeciesIds — undefined and [] are not equivalent', () => {
    it('undefined → no condition added (no evolution stage filter)', () => {
      expect(buildPokemonWhere({}, undefined)).toEqual({});
    });

    it('[] → species_id: { in: [] } (empty IN excludes all rows)', () => {
      expect(buildPokemonWhere({}, [])).toEqual({ AND: [{ species_id: { in: [] } }] });
    });
  });

  describe('rarity — exact WHERE clause per tier', () => {
    it.each([
      ['legendary', { is_legendary: true }],
      ['mythical', { is_mythical: true }],
      ['rare', { is_legendary: false, is_mythical: false, capture_rate: { lte: 45 } }],
      ['uncommon', { is_legendary: false, is_mythical: false, capture_rate: { gt: 45, lte: 100 } }],
    ])('%s produces the correct OR branch', (rarity, expected) => {
      const [branch] = rarityBranches([rarity]);
      expect(branch).toEqual(expected);
    });

    it('common: is_legendary and is_mythical are false; capture_rate covers null and > 100', () => {
      const [branch] = rarityBranches(['common']) as [
        { is_legendary: boolean; is_mythical: boolean; OR: object[] },
      ];
      expect(branch.is_legendary).toBe(false);
      expect(branch.is_mythical).toBe(false);
      expect(branch.OR).toContainEqual({ capture_rate: { gt: 100 } });
      expect(branch.OR).toContainEqual({ capture_rate: null });
    });
  });

  describe('rarity — OR accumulation', () => {
    it.each([1, 2, 3, 4, 5])(
      '%i known rarity values produce exactly that many OR branches',
      (count) => {
        const allRarities = ['legendary', 'mythical', 'rare', 'uncommon', 'common'];
        expect(rarityBranches(allRarities.slice(0, count))).toHaveLength(count);
      },
    );

    it('all rarity OR branches are placed inside a single AND condition', () => {
      const result = buildPokemonWhere({ rarity: ['legendary', 'rare', 'common'] }) as {
        AND: object[];
      };
      expect(result.AND).toHaveLength(1);
    });

    it('unknown rarity string produces no condition at all', () => {
      expect(buildPokemonWhere({ rarity: ['ultra-rare'] })).toEqual({});
    });

    it('unknown rarity mixed with known — only the known branch appears', () => {
      const branches = rarityBranches(['legendary', 'ultra-rare']);
      expect(branches).toHaveLength(1);
      expect(branches[0]).toEqual({ is_legendary: true });
    });
  });

  describe('AND condition ordering', () => {
    it('search → types → generation (in declaration order)', () => {
      const result = buildPokemonWhere({
        search: 'char',
        types: ['fire'],
        generation: [1],
      }) as { AND: object[] };

      expect(result.AND[0]).toEqual({
        OR: [
          {
            species: {
              pokemon_species_name: { some: { language: 'en', name: { contains: 'char' } } },
            },
          },
          {
            pokemon_form: {
              some: { pokemon_form_name: { some: { language: 'en', name: { contains: 'char' } } } },
            },
          },
        ],
      });
      expect(result.AND[1]).toEqual({
        pokemon_type: { some: { type: { name: { in: ['fire'] } } } },
      });
      expect(result.AND[2]).toEqual({ species: { generation_id: { in: [1] } } });
    });

    it('evolutionSpeciesIds is always the last AND condition', () => {
      const result = buildPokemonWhere(
        { search: 'bulba', types: ['grass'], generation: [1] },
        [1, 2, 3],
      ) as { AND: object[] };
      expect(result.AND.at(-1)).toEqual({ species_id: { in: [1, 2, 3] } });
    });
  });

  describe('scenarios', () => {
    it('kanto grass starters: gen 1 + grass type + species IDs combined', () => {
      const result = buildPokemonWhere({ generation: [1], types: ['grass'] }, [1, 2, 3]) as {
        AND: object[];
      };

      expect(result.AND).toContainEqual({ species: { generation_id: { in: [1] } } });
      expect(result.AND).toContainEqual({
        pokemon_type: { some: { type: { name: { in: ['grass'] } } } },
      });
      expect(result.AND).toContainEqual({ species_id: { in: [1, 2, 3] } });
    });

    it('isBaby: true adds a single species.is_baby: true condition', () => {
      const result = buildPokemonWhere({ isBaby: true }) as { AND: object[] };
      expect(result.AND).toEqual([{ species: { is_baby: true } }]);
    });
  });
});
