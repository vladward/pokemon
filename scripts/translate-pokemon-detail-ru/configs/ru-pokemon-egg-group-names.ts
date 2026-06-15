import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-egg-group-names',
  description: 'Pokémon egg group names → Russian',
  clearQuery: "DELETE FROM egg_group_name WHERE language = 'ru'",
  exportQuery: `
        SELECT egg_group_id AS id, name AS text
        FROM egg_group_name e
        WHERE e.language = 'en'
          AND NOT EXISTS (SELECT 1
                          FROM egg_group_name
                          WHERE egg_group_id = e.egg_group_id AND language = 'ru')
    `,
  seedQuery: `
        INSERT INTO egg_group_name (egg_group_id, language, name)
        VALUES ? ON DUPLICATE KEY
        UPDATE name =
        VALUES (name)
    `,
  buildRow: (id, text) => [id, 'ru', text],
};
