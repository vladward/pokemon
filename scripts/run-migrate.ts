import 'dotenv/config';

import { db } from '../lib/db';

const tables: string[] = [
  `CREATE TABLE IF NOT EXISTS \`generation\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`main_region_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`evolution_chain\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`baby_trigger_item_id\`
        int
        DEFAULT
        NULL,
        PRIMARY
        KEY
     (
        \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_species\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`gender_rate\` int DEFAULT NULL,
        \`capture_rate\` int DEFAULT NULL,
        \`base_happiness\` int DEFAULT NULL,
        \`is_baby\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`hatch_counter\` int DEFAULT NULL,
        \`has_gender_differences\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`forms_switchable\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`is_legendary\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`is_mythical\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`order_index\` int DEFAULT NULL,
        \`generation_id\` int DEFAULT NULL,
        \`color\` varchar
     (
         50
     ) DEFAULT NULL,
        \`shape\` varchar
     (
         50
     ) DEFAULT NULL,
        \`habitat\` varchar
     (
         50
     ) DEFAULT NULL,
        \`growth_rate\` varchar
     (
         50
     ) DEFAULT NULL,
        \`evolution_chain_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`egg_group\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_species_egg_group\`
    (
        \`species_id\`
        int
        NOT
        NULL,
        \`egg_group_id\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`species_id\`,
        \`egg_group_id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_species_name\`
    (
        \`species_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`species_id\`,
         \`language\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_species_genus\`
    (
        \`species_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`genus\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`species_id\`,
         \`language\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_species_flavor_text\`
    (
        \`id\`
        int
        NOT
        NULL
        AUTO_INCREMENT,
        \`species_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`game_version\` varchar
     (
         50
     ) NOT NULL,
        \`flavor_text\` text NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        UNIQUE KEY \`uq_species_flavor\`
     (
         \`species_id\`,
         \`language\`,
         \`game_version\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_pokedex_number\`
    (
        \`species_id\`
        int
        NOT
        NULL,
        \`pokedex_name\`
        varchar
     (
        50
     ) NOT NULL,
        \`entry_number\` int NOT NULL,
        PRIMARY KEY
     (
         \`species_id\`,
         \`pokedex_name\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_evolution\`
    (
        \`id\`
        int
        NOT
        NULL
        AUTO_INCREMENT,
        \`chain_id\`
        int
        DEFAULT
        NULL,
        \`from_species_id\`
        int
        DEFAULT
        NULL,
        \`to_species_id\`
        int
        DEFAULT
        NULL,
        \`trigger\`
        varchar
     (
        100
     ) DEFAULT NULL,
        \`min_level\` int DEFAULT NULL,
        \`min_happiness\` int DEFAULT NULL,
        \`min_beauty\` int DEFAULT NULL,
        \`min_affection\` int DEFAULT NULL,
        \`needs_overworld_rain\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`relative_physical_stats\` int DEFAULT NULL,
        \`time_of_day\` varchar
     (
         20
     ) DEFAULT NULL,
        \`turn_upside_down\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`gender\` int DEFAULT NULL,
        \`item_id\` int DEFAULT NULL,
        \`held_item_id\` int DEFAULT NULL,
        \`known_move_id\` int DEFAULT NULL,
        \`known_move_type_id\` int DEFAULT NULL,
        \`location_id\` int DEFAULT NULL,
        \`party_species_id\` int DEFAULT NULL,
        \`party_type_id\` int DEFAULT NULL,
        \`trade_species_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        KEY \`chain_id\`
     (
         \`chain_id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`base_experience\` int DEFAULT NULL,
        \`height\` int DEFAULT NULL,
        \`weight\` int DEFAULT NULL,
        \`is_default\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`order_index\` int DEFAULT NULL,
        \`cry_latest_url\` text DEFAULT NULL,
        \`cry_legacy_url\` text DEFAULT NULL,
        \`species_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`type\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`generation_id\` int DEFAULT NULL,
        \`move_damage_class\` varchar
     (
         20
     ) DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`ability\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_type\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`type_id\`
        int
        NOT
        NULL,
        \`slot\`
        int
        DEFAULT
        NULL,
        PRIMARY
        KEY
     (
        \`pokemon_id\`,
        \`type_id\`
     ),
        KEY \`type_id\`
     (
         \`type_id\`
     ),
        CONSTRAINT \`pokemon_type_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_type_ibfk_2\` FOREIGN KEY
     (
         \`type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_ability\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`ability_id\`
        int
        NOT
        NULL,
        \`is_hidden\`
        tinyint
     (
        1
     ) DEFAULT NULL,
        \`slot\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`pokemon_id\`,
         \`ability_id\`
     ),
        KEY \`ability_id\`
     (
         \`ability_id\`
     ),
        CONSTRAINT \`pokemon_ability_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_ability_ibfk_2\` FOREIGN KEY
     (
         \`ability_id\`
     ) REFERENCES \`ability\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_stat\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`stat_name\`
        varchar
     (
        50
     ) NOT NULL,
        \`base_stat\` int NOT NULL,
        \`effort\` int NOT NULL,
        PRIMARY KEY
     (
         \`pokemon_id\`,
         \`stat_name\`
     ),
        CONSTRAINT \`pokemon_stat_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_sprite\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`sprite_name\`
        varchar
     (
        150
     ) NOT NULL,
        \`url\` text NOT NULL,
        PRIMARY KEY
     (
         \`pokemon_id\`,
         \`sprite_name\`
     ),
        CONSTRAINT \`pokemon_sprite_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`version_group\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`generation_id\` int DEFAULT NULL,
        \`order_index\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_move\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`move_id\`
        int
        NOT
        NULL,
        \`version_group_id\`
        int
        NOT
        NULL,
        \`learn_method\`
        varchar
     (
        50
     ) NOT NULL,
        \`level_learned_at\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`pokemon_id\`,
         \`move_id\`,
         \`version_group_id\`,
         \`learn_method\`
     ),
        KEY \`move_id\`
     (
         \`move_id\`
     ),
        KEY \`version_group_id\`
     (
         \`version_group_id\`
     ),
        CONSTRAINT \`pokemon_move_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_move_ibfk_2\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_move_ibfk_3\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`version\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`version_group_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_held_item\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`item_id\`
        int
        NOT
        NULL,
        \`version_id\`
        int
        NOT
        NULL,
        \`rarity\`
        int
        DEFAULT
        NULL,
        PRIMARY
        KEY
     (
        \`pokemon_id\`,
        \`item_id\`,
        \`version_id\`
     ),
        KEY \`item_id\`
     (
         \`item_id\`
     ),
        KEY \`version_id\`
     (
         \`version_id\`
     ),
        CONSTRAINT \`pokemon_held_item_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_held_item_ibfk_2\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_held_item_ibfk_3\` FOREIGN KEY
     (
         \`version_id\`
     ) REFERENCES \`version\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_game_index\`
    (
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`version_id\`
        int
        NOT
        NULL,
        \`game_index\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`pokemon_id\`,
        \`version_id\`
     ),
        KEY \`version_id\`
     (
         \`version_id\`
     ),
        CONSTRAINT \`pokemon_game_index_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_game_index_ibfk_2\` FOREIGN KEY
     (
         \`version_id\`
     ) REFERENCES \`version\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_form\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) DEFAULT NULL,
        \`form_name\` varchar
     (
         100
     ) DEFAULT NULL,
        \`is_default\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`is_battle_only\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`is_mega\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`form_order\` int DEFAULT NULL,
        \`version_group_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        KEY \`pokemon_id\`
     (
         \`pokemon_id\`
     ),
        CONSTRAINT \`pokemon_form_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_past_type\`
    (
        \`id\`
        int
        NOT
        NULL
        AUTO_INCREMENT,
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`generation_id\`
        int
        NOT
        NULL,
        \`slot\`
        int
        NOT
        NULL,
        \`type_id\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`id\`
     ),
        UNIQUE KEY \`uq_pokemon_past_type\`
     (
         \`pokemon_id\`,
         \`generation_id\`,
         \`slot\`
     ),
        KEY \`type_id\`
     (
         \`type_id\`
     ),
        CONSTRAINT \`pokemon_past_type_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_past_type_ibfk_2\` FOREIGN KEY
     (
         \`type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_past_ability\`
    (
        \`id\`
        int
        NOT
        NULL
        AUTO_INCREMENT,
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`generation_id\`
        int
        NOT
        NULL,
        \`slot\`
        int
        NOT
        NULL,
        \`ability_id\`
        int
        NOT
        NULL,
        \`is_hidden\`
        tinyint
     (
        1
     ) DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        UNIQUE KEY \`uq_pokemon_past_ability\`
     (
         \`pokemon_id\`,
         \`generation_id\`,
         \`slot\`
     ),
        KEY \`ability_id\`
     (
         \`ability_id\`
     ),
        CONSTRAINT \`pokemon_past_ability_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_past_ability_ibfk_2\` FOREIGN KEY
     (
         \`ability_id\`
     ) REFERENCES \`ability\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_raw\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) DEFAULT NULL,
        \`api_data\` json NOT NULL,
        \`fetched_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`seed_state\`
    (
        \`id\`
        varchar
     (
        50
     ) NOT NULL,
        \`value\` int NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move_name\`
    (
        \`move_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`move_id\`,
         \`language\`
     ),
        CONSTRAINT \`move_name_ibfk_1\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move_effect\`
    (
        \`move_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`short_effect\` text,
        \`effect\` text,
        PRIMARY KEY
     (
         \`move_id\`,
         \`language\`
     ),
        CONSTRAINT \`move_effect_ibfk_1\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move_flavor_text\`
    (
        \`move_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`version_group_id\` int NOT NULL,
        \`flavor_text\` text NOT NULL,
        PRIMARY KEY
     (
         \`move_id\`,
         \`language\`,
         \`version_group_id\`
     ),
        CONSTRAINT \`move_flavor_text_ibfk_1\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     ),
        CONSTRAINT \`move_flavor_text_ibfk_2\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move_meta\`
    (
        \`move_id\`
        int
        NOT
        NULL,
        \`ailment\`
        varchar
     (
        50
     ) DEFAULT NULL,
        \`category\` varchar
     (
         50
     ) DEFAULT NULL,
        \`min_hits\` int DEFAULT NULL,
        \`max_hits\` int DEFAULT NULL,
        \`min_turns\` int DEFAULT NULL,
        \`max_turns\` int DEFAULT NULL,
        \`drain\` int DEFAULT NULL,
        \`healing\` int DEFAULT NULL,
        \`crit_rate\` int DEFAULT NULL,
        \`ailment_chance\` int DEFAULT NULL,
        \`flinch_chance\` int DEFAULT NULL,
        \`stat_chance\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`move_id\`
     ),
        CONSTRAINT \`move_meta_ibfk_1\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move_stat_change\`
    (
        \`move_id\`
        int
        NOT
        NULL,
        \`stat_name\`
        varchar
     (
        50
     ) NOT NULL,
        \`change\` int NOT NULL,
        PRIMARY KEY
     (
         \`move_id\`,
         \`stat_name\`
     ),
        CONSTRAINT \`move_stat_change_ibfk_1\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`move_past_value\`
    (
        \`move_id\`
        int
        NOT
        NULL,
        \`version_group_id\`
        int
        NOT
        NULL,
        \`power\`
        int
        DEFAULT
        NULL,
        \`pp\`
        int
        DEFAULT
        NULL,
        \`accuracy\`
        int
        DEFAULT
        NULL,
        \`effect_chance\`
        int
        DEFAULT
        NULL,
        \`type_id\`
        int
        DEFAULT
        NULL,
        PRIMARY
        KEY
     (
        \`move_id\`,
        \`version_group_id\`
     ),
        CONSTRAINT \`move_past_value_ibfk_1\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     ),
        CONSTRAINT \`move_past_value_ibfk_2\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`ability_name\`
    (
        \`ability_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`ability_id\`,
         \`language\`
     ),
        CONSTRAINT \`ability_name_ibfk_1\` FOREIGN KEY
     (
         \`ability_id\`
     ) REFERENCES \`ability\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`ability_effect\`
    (
        \`ability_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`short_effect\` text,
        \`effect\` text,
        PRIMARY KEY
     (
         \`ability_id\`,
         \`language\`
     ),
        CONSTRAINT \`ability_effect_ibfk_1\` FOREIGN KEY
     (
         \`ability_id\`
     ) REFERENCES \`ability\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`ability_flavor_text\`
    (
        \`ability_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`version_group_id\` int NOT NULL,
        \`flavor_text\` text NOT NULL,
        PRIMARY KEY
     (
         \`ability_id\`,
         \`language\`,
         \`version_group_id\`
     ),
        CONSTRAINT \`ability_flavor_text_ibfk_1\` FOREIGN KEY
     (
         \`ability_id\`
     ) REFERENCES \`ability\`
     (
         \`id\`
     ),
        CONSTRAINT \`ability_flavor_text_ibfk_2\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`type_name\`
    (
        \`type_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`type_id\`,
         \`language\`
     ),
        CONSTRAINT \`type_name_ibfk_1\` FOREIGN KEY
     (
         \`type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`type_efficacy\`
    (
        \`from_type_id\`
        int
        NOT
        NULL,
        \`to_type_id\`
        int
        NOT
        NULL,
        \`damage_factor\`
        int
        NOT
        NULL
        COMMENT
        '0=immune,50=half,100=normal,200=double',
        PRIMARY
        KEY
     (
        \`from_type_id\`,
        \`to_type_id\`
     ),
        CONSTRAINT \`type_efficacy_ibfk_1\` FOREIGN KEY
     (
         \`from_type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     ),
        CONSTRAINT \`type_efficacy_ibfk_2\` FOREIGN KEY
     (
         \`to_type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`type_past_efficacy\`
    (
        \`from_type_id\`
        int
        NOT
        NULL,
        \`to_type_id\`
        int
        NOT
        NULL,
        \`generation_id\`
        int
        NOT
        NULL,
        \`damage_factor\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`from_type_id\`,
        \`to_type_id\`,
        \`generation_id\`
     ),
        CONSTRAINT \`type_past_efficacy_ibfk_1\` FOREIGN KEY
     (
         \`from_type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     ),
        CONSTRAINT \`type_past_efficacy_ibfk_2\` FOREIGN KEY
     (
         \`to_type_id\`
     ) REFERENCES \`type\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_category\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_attribute\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_to_attribute\`
    (
        \`item_id\`
        int
        NOT
        NULL,
        \`attribute_id\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`item_id\`,
        \`attribute_id\`
     ),
        CONSTRAINT \`item_to_attribute_ibfk_1\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     ),
        CONSTRAINT \`item_to_attribute_ibfk_2\` FOREIGN KEY
     (
         \`attribute_id\`
     ) REFERENCES \`item_attribute\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_name\`
    (
        \`item_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`item_id\`,
         \`language\`
     ),
        CONSTRAINT \`item_name_ibfk_1\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_effect\`
    (
        \`item_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`short_effect\` text,
        \`effect\` text,
        PRIMARY KEY
     (
         \`item_id\`,
         \`language\`
     ),
        CONSTRAINT \`item_effect_ibfk_1\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_flavor_text\`
    (
        \`item_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`version_group_id\` int NOT NULL,
        \`flavor_text\` text NOT NULL,
        PRIMARY KEY
     (
         \`item_id\`,
         \`language\`,
         \`version_group_id\`
     ),
        CONSTRAINT \`item_flavor_text_ibfk_1\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     ),
        CONSTRAINT \`item_flavor_text_ibfk_2\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_form_type\`
    (
        \`form_id\`
        int
        NOT
        NULL,
        \`slot\`
        int
        NOT
        NULL,
        \`type_id\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`form_id\`,
        \`slot\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_form_sprite\`
    (
        \`form_id\`
        int
        NOT
        NULL,
        \`slot\`
        varchar
     (
        30
     ) NOT NULL,
        \`url\` varchar
     (
         255
     ) NOT NULL,
        PRIMARY KEY
     (
         \`form_id\`,
         \`slot\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_form_name\`
    (
        \`form_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`form_id\`,
         \`language\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`nature\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        50
     ) NOT NULL,
        \`decreased_stat\` varchar
     (
         50
     ) DEFAULT NULL,
        \`increased_stat\` varchar
     (
         50
     ) DEFAULT NULL,
        \`hates_flavor\` varchar
     (
         50
     ) DEFAULT NULL,
        \`likes_flavor\` varchar
     (
         50
     ) DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`nature_name\`
    (
        \`nature_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`nature_id\`,
         \`language\`
     ),
        CONSTRAINT \`nature_name_ibfk_1\` FOREIGN KEY
     (
         \`nature_id\`
     ) REFERENCES \`nature\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`nature_pokeathlon_stat\`
    (
        \`nature_id\`
        int
        NOT
        NULL,
        \`stat_name\`
        varchar
     (
        50
     ) NOT NULL,
        \`max_change\` int NOT NULL,
        PRIMARY KEY
     (
         \`nature_id\`,
         \`stat_name\`
     ),
        CONSTRAINT \`nature_pokeathlon_stat_ibfk_1\` FOREIGN KEY
     (
         \`nature_id\`
     ) REFERENCES \`nature\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`region\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`main_generation_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`location\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`region_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        CONSTRAINT \`location_ibfk_1\` FOREIGN KEY
     (
         \`region_id\`
     ) REFERENCES \`region\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`location_name\`
    (
        \`location_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         200
     ) NOT NULL,
        PRIMARY KEY
     (
         \`location_id\`,
         \`language\`
     ),
        CONSTRAINT \`location_name_ibfk_1\` FOREIGN KEY
     (
         \`location_id\`
     ) REFERENCES \`location\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`location_area\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`location_id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`game_index\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        CONSTRAINT \`location_area_ibfk_1\` FOREIGN KEY
     (
         \`location_id\`
     ) REFERENCES \`location\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`location_area_name\`
    (
        \`area_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         200
     ) NOT NULL,
        PRIMARY KEY
     (
         \`area_id\`,
         \`language\`
     ),
        CONSTRAINT \`location_area_name_ibfk_1\` FOREIGN KEY
     (
         \`area_id\`
     ) REFERENCES \`location_area\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`encounter_method\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`order_index\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`encounter_method_name\`
    (
        \`method_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`method_id\`,
         \`language\`
     ),
        CONSTRAINT \`encounter_method_name_ibfk_1\` FOREIGN KEY
     (
         \`method_id\`
     ) REFERENCES \`encounter_method\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokemon_encounter\`
    (
        \`id\`
        int
        NOT
        NULL
        AUTO_INCREMENT,
        \`pokemon_id\`
        int
        NOT
        NULL,
        \`area_id\`
        int
        NOT
        NULL,
        \`method_id\`
        int
        NOT
        NULL,
        \`version\`
        varchar
     (
        30
     ) NOT NULL,
        \`min_level\` tinyint DEFAULT NULL,
        \`max_level\` tinyint DEFAULT NULL,
        \`chance\` tinyint DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        UNIQUE KEY \`uq_encounter\`
     (
         \`pokemon_id\`,
         \`area_id\`,
         \`method_id\`,
         \`version\`
     ),
        CONSTRAINT \`pokemon_encounter_ibfk_1\` FOREIGN KEY
     (
         \`pokemon_id\`
     ) REFERENCES \`pokemon\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_encounter_ibfk_2\` FOREIGN KEY
     (
         \`area_id\`
     ) REFERENCES \`location_area\`
     (
         \`id\`
     ),
        CONSTRAINT \`pokemon_encounter_ibfk_3\` FOREIGN KEY
     (
         \`method_id\`
     ) REFERENCES \`encounter_method\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`machine\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`item_id\`
        int
        NOT
        NULL,
        \`move_id\`
        int
        NOT
        NULL,
        \`version_group_id\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`id\`
     ),
        UNIQUE KEY \`uq_machine\`
     (
         \`move_id\`,
         \`version_group_id\`
     ),
        CONSTRAINT \`machine_ibfk_1\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     ),
        CONSTRAINT \`machine_ibfk_2\` FOREIGN KEY
     (
         \`move_id\`
     ) REFERENCES \`move\`
     (
         \`id\`
     ),
        CONSTRAINT \`machine_ibfk_3\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`location_game_index\`
    (
        \`location_id\`
        int
        NOT
        NULL,
        \`game_index\`
        int
        NOT
        NULL,
        \`generation_name\`
        varchar
     (
        30
     ) NOT NULL,
        PRIMARY KEY
     (
         \`location_id\`,
         \`game_index\`,
         \`generation_name\`
     ),
        CONSTRAINT \`location_game_index_ibfk_1\` FOREIGN KEY
     (
         \`location_id\`
     ) REFERENCES \`location\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`generation_name\`
    (
        \`generation_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`generation_id\`,
         \`language\`
     ),
        CONSTRAINT \`generation_name_ibfk_1\` FOREIGN KEY
     (
         \`generation_id\`
     ) REFERENCES \`generation\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`region_name\`
    (
        \`region_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`region_id\`,
         \`language\`
     ),
        CONSTRAINT \`region_name_ibfk_1\` FOREIGN KEY
     (
         \`region_id\`
     ) REFERENCES \`region\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`version_name\`
    (
        \`version_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`version_id\`,
         \`language\`
     ),
        CONSTRAINT \`version_name_ibfk_1\` FOREIGN KEY
     (
         \`version_id\`
     ) REFERENCES \`version\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`version_group_name\`
    (
        \`version_group_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`version_group_id\`,
         \`language\`
     ),
        CONSTRAINT \`version_group_name_ibfk_1\` FOREIGN KEY
     (
         \`version_group_id\`
     ) REFERENCES \`version_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_category_name\`
    (
        \`category_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`category_id\`,
         \`language\`
     ),
        CONSTRAINT \`item_category_name_ibfk_1\` FOREIGN KEY
     (
         \`category_id\`
     ) REFERENCES \`item_category\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`item_attribute_name\`
    (
        \`attribute_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        \`description\` text DEFAULT NULL,
        PRIMARY KEY
     (
         \`attribute_id\`,
         \`language\`
     ),
        CONSTRAINT \`item_attribute_name_ibfk_1\` FOREIGN KEY
     (
         \`attribute_id\`
     ) REFERENCES \`item_attribute\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`stat\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        50
     ) NOT NULL,
        \`game_index\` int DEFAULT NULL,
        \`is_battle_only\` tinyint
     (
         1
     ) DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`stat_name\`
    (
        \`stat_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`stat_id\`,
         \`language\`
     ),
        CONSTRAINT \`stat_name_ibfk_1\` FOREIGN KEY
     (
         \`stat_id\`
     ) REFERENCES \`stat\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokedex\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`is_main_series\` tinyint
     (
         1
     ) DEFAULT NULL,
        \`region_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokedex_name\`
    (
        \`pokedex_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`pokedex_id\`,
         \`language\`
     ),
        CONSTRAINT \`pokedex_name_ibfk_1\` FOREIGN KEY
     (
         \`pokedex_id\`
     ) REFERENCES \`pokedex\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`pokedex_description\`
    (
        \`pokedex_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`description\` text NOT NULL,
        PRIMARY KEY
     (
         \`pokedex_id\`,
         \`language\`
     ),
        CONSTRAINT \`pokedex_description_ibfk_1\` FOREIGN KEY
     (
         \`pokedex_id\`
     ) REFERENCES \`pokedex\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`egg_group_name\`
    (
        \`egg_group_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`name\` varchar
     (
         100
     ) NOT NULL,
        PRIMARY KEY
     (
         \`egg_group_id\`,
         \`language\`
     ),
        CONSTRAINT \`egg_group_name_ibfk_1\` FOREIGN KEY
     (
         \`egg_group_id\`
     ) REFERENCES \`egg_group\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`growth_rate\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        50
     ) NOT NULL,
        \`formula\` text DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`growth_rate_experience\`
    (
        \`growth_rate_id\`
        int
        NOT
        NULL,
        \`level\`
        int
        NOT
        NULL,
        \`experience\`
        int
        NOT
        NULL,
        PRIMARY
        KEY
     (
        \`growth_rate_id\`,
        \`level\`
     ),
        CONSTRAINT \`growth_rate_experience_ibfk_1\` FOREIGN KEY
     (
         \`growth_rate_id\`
     ) REFERENCES \`growth_rate\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`characteristic\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`gene_modulo\`
        int
        NOT
        NULL,
        \`highest_stat_id\`
        int
        DEFAULT
        NULL,
        PRIMARY
        KEY
     (
        \`id\`
     ),
        CONSTRAINT \`characteristic_ibfk_1\` FOREIGN KEY
     (
         \`highest_stat_id\`
     ) REFERENCES \`stat\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`characteristic_description\`
    (
        \`characteristic_id\`
        int
        NOT
        NULL,
        \`language\`
        varchar
     (
        10
     ) NOT NULL,
        \`description\` varchar
     (
         200
     ) NOT NULL,
        PRIMARY KEY
     (
         \`characteristic_id\`,
         \`language\`
     ),
        CONSTRAINT \`characteristic_description_ibfk_1\` FOREIGN KEY
     (
         \`characteristic_id\`
     ) REFERENCES \`characteristic\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`berry\`
    (
        \`id\`
        int
        NOT
        NULL,
        \`item_id\`
        int
        NOT
        NULL,
        \`name\`
        varchar
     (
        100
     ) NOT NULL,
        \`growth_time\` int DEFAULT NULL,
        \`max_harvest\` int DEFAULT NULL,
        \`natural_gift_power\` int DEFAULT NULL,
        \`size\` int DEFAULT NULL,
        \`smoothness\` int DEFAULT NULL,
        \`soil_dryness\` int DEFAULT NULL,
        \`firmness\` varchar
     (
         50
     ) DEFAULT NULL,
        \`natural_gift_type_id\` int DEFAULT NULL,
        PRIMARY KEY
     (
         \`id\`
     ),
        CONSTRAINT \`berry_ibfk_1\` FOREIGN KEY
     (
         \`item_id\`
     ) REFERENCES \`item\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,

  `CREATE TABLE IF NOT EXISTS \`berry_flavor\`
    (
        \`berry_id\`
        int
        NOT
        NULL,
        \`flavor\`
        varchar
     (
        50
     ) NOT NULL,
        \`potency\` int NOT NULL,
        PRIMARY KEY
     (
         \`berry_id\`,
         \`flavor\`
     ),
        CONSTRAINT \`berry_flavor_ibfk_1\` FOREIGN KEY
     (
         \`berry_id\`
     ) REFERENCES \`berry\`
     (
         \`id\`
     )
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_0900_ai_ci`,
];

const alterColumns = [
  'ALTER TABLE `pokemon` ADD COLUMN `cry_latest_url` text DEFAULT NULL',
  'ALTER TABLE `pokemon` ADD COLUMN `cry_legacy_url` text DEFAULT NULL',
  'ALTER TABLE `pokemon` ADD COLUMN `species_id` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `power` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `pp` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `accuracy` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `priority` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `effect_chance` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `type_id` int DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `damage_class` varchar(20) DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `target` varchar(50) DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `contest_type` varchar(50) DEFAULT NULL',
  'ALTER TABLE `move` ADD COLUMN `generation_id` int DEFAULT NULL',
  'ALTER TABLE `ability` ADD COLUMN `generation_id` int DEFAULT NULL',
  'ALTER TABLE `ability` ADD COLUMN `is_main_series` tinyint(1) DEFAULT NULL',
  'ALTER TABLE `item` ADD COLUMN `cost` int DEFAULT NULL',
  'ALTER TABLE `item` ADD COLUMN `fling_power` int DEFAULT NULL',
  'ALTER TABLE `item` ADD COLUMN `fling_effect` varchar(100) DEFAULT NULL',
  'ALTER TABLE `item` ADD COLUMN `category_id` int DEFAULT NULL',
  'ALTER TABLE `item` ADD COLUMN `sprite_url` text DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `name` varchar(100) DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `form_name` varchar(100) DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `is_default` tinyint(1) DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `is_battle_only` tinyint(1) DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `is_mega` tinyint(1) DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `form_order` int DEFAULT NULL',
  'ALTER TABLE `pokemon_form` ADD COLUMN `version_group_id` int DEFAULT NULL',
  'ALTER TABLE `type` ADD COLUMN `generation_id` int DEFAULT NULL',
  'ALTER TABLE `type` ADD COLUMN `move_damage_class` varchar(20) DEFAULT NULL',
  'ALTER TABLE `version_group` ADD COLUMN `generation_id` int DEFAULT NULL',
  'ALTER TABLE `version_group` ADD COLUMN `order_index` int DEFAULT NULL',
  'ALTER TABLE `version` ADD COLUMN `version_group_id` int DEFAULT NULL',
  'ALTER TABLE `generation` ADD COLUMN `main_region_id` int DEFAULT NULL',
  'ALTER TABLE `region` ADD COLUMN `main_generation_id` int DEFAULT NULL',
  'ALTER TABLE `pokemon_species_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `pokemon_species_genus` MODIFY COLUMN `genus` varchar(200) NOT NULL',
  'ALTER TABLE `move_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `ability_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `type_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `item_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `item_category_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `item_attribute_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `nature_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `stat_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `pokedex_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `egg_group_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `generation_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `region_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `version_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `version_group_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `encounter_method_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
  'ALTER TABLE `pokemon_form_name` MODIFY COLUMN `name` varchar(200) NOT NULL',
];

async function migrate(): Promise<void> {
  console.log('Running migrations...');

  for (const sql of tables) {
    await db.query(sql);
  }

  for (const sql of alterColumns) {
    try {
      await db.query(sql);
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException & { code?: string }).code !== 'ER_DUP_FIELDNAME') throw err;
    }
  }

  console.log('Migrations complete');
}

migrate()
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  })
  .finally(() => {
    db.end();
  });
