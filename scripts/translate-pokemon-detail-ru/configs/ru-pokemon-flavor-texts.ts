import type { TranslationConfig } from '../core/config';

export const config: TranslationConfig = {
  name: 'ru-pokemon-flavor-texts',
  description: 'Pokémon flavor texts → Russian (latest English per species)',
  clearQuery: "DELETE FROM pokemon_species_flavor_text WHERE language = 'ru'",
  exportQuery: `
    SELECT f.species_id AS id, f.flavor_text AS text
    FROM pokemon_species_flavor_text f
    WHERE f.language = 'en'
    AND f.id = (
      SELECT MAX(id) FROM pokemon_species_flavor_text
      WHERE species_id = f.species_id AND language = 'en'
    )
    AND NOT EXISTS (
      SELECT 1 FROM pokemon_species_flavor_text
      WHERE species_id = f.species_id AND language = 'ru'
    )
  `,
  seedQuery: `
    INSERT INTO pokemon_species_flavor_text (species_id, language, game_version, flavor_text)
    VALUES ? ON DUPLICATE KEY UPDATE flavor_text = VALUES(flavor_text)
  `,
  buildRow: (id, text) => [id, 'ru', 'translation', text],
};
