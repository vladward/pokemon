import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-location-names',
  description: 'Pokémon location names → Russian',
  clearQuery: "DELETE FROM location_name WHERE language = 'ru'",
  exportQuery: `
    SELECT location_id AS id, name AS text
    FROM location_name l
    WHERE l.language = 'en'
    AND NOT EXISTS (
      SELECT 1 FROM location_name WHERE location_id = l.location_id AND language = 'ru'
    )
  `,
  seedQuery: `
    INSERT INTO location_name (location_id, language, name)
    VALUES ? ON DUPLICATE KEY UPDATE name = VALUES(name)
  `,
  buildRow: (id, text) => [id, 'ru', text],
};
