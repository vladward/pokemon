import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-genus',
  description: 'Pokémon genus labels → Russian ("Seed Pokémon" etc.)',
  clearQuery: "DELETE FROM pokemon_species_genus WHERE language = 'ru'",
  exportQuery: `
        SELECT species_id AS id, genus AS text
        FROM pokemon_species_genus g
        WHERE g.language = 'en'
          AND NOT EXISTS (SELECT 1
                          FROM pokemon_species_genus
                          WHERE species_id = g.species_id AND language = 'ru')
    `,
  seedQuery: `
        INSERT INTO pokemon_species_genus (species_id, language, genus)
        VALUES ? ON DUPLICATE KEY
        UPDATE genus =
        VALUES (genus)
    `,
  buildRow: (id, text) => [id, 'ru', text],
};
