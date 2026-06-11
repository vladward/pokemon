import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-type-names',
  description: 'Pokémon type names → Russian (Fire, Water…)',
  clearQuery: "DELETE FROM type_name WHERE language = 'ru'",
  exportQuery: `
    SELECT type_id AS id, name AS text
    FROM type_name t
    WHERE t.language = 'en'
    AND NOT EXISTS (
      SELECT 1 FROM type_name WHERE type_id = t.type_id AND language = 'ru'
    )
  `,
  seedQuery: `
    INSERT INTO type_name (type_id, language, name)
    VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)
  `,
  buildRow: (id, text) => [id, 'ru', text],
};
