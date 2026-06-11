import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-ability-effects',
  description: 'Pokémon ability short effect descriptions → Russian',
  clearQuery: "DELETE FROM ability_effect WHERE language = 'ru'",
  exportQuery: `
    SELECT ability_id AS id, short_effect AS text
    FROM ability_effect a
    WHERE a.language = 'en'
    AND a.short_effect IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM ability_effect WHERE ability_id = a.ability_id AND language = 'ru'
    )
  `,
  seedQuery: `
    INSERT INTO ability_effect (ability_id, language, short_effect)
    VALUES ? ON DUPLICATE KEY UPDATE short_effect = VALUES(short_effect)
  `,
  buildRow: (id, text) => [id, 'ru', text],
};
