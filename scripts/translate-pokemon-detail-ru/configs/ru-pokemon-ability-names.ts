import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-ability-names',
  description: 'Pokémon ability names → Russian',
  clearQuery: "DELETE FROM ability_name WHERE language = 'ru'",
  exportQuery: `
        SELECT ability_id AS id, name AS text
        FROM ability_name a
        WHERE a.language = 'en'
          AND NOT EXISTS (SELECT 1
                          FROM ability_name
                          WHERE ability_id = a.ability_id AND language = 'ru')
    `,
  seedQuery: `
        INSERT INTO ability_name (ability_id, language, name)
        VALUES ? ON DUPLICATE KEY
        UPDATE name =
        VALUES (name)
    `,
  buildRow: (id, text) => [id, 'ru', text],
};
