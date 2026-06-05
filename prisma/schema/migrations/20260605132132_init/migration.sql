-- CreateTable
CREATE TABLE `ability` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `generation_id` INTEGER NULL,
    `is_main_series` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability_effect` (
    `ability_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `short_effect` TEXT NULL,
    `effect` TEXT NULL,

    PRIMARY KEY (`ability_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability_flavor_text` (
    `ability_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `version_group_id` INTEGER NOT NULL,
    `flavor_text` TEXT NOT NULL,

    INDEX `ability_flavor_text_ibfk_2`(`version_group_id`),
    PRIMARY KEY (`ability_id`, `language`, `version_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability_name` (
    `ability_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`ability_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berry` (
    `id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `growth_time` INTEGER NULL,
    `max_harvest` INTEGER NULL,
    `natural_gift_power` INTEGER NULL,
    `size` INTEGER NULL,
    `smoothness` INTEGER NULL,
    `soil_dryness` INTEGER NULL,
    `firmness` VARCHAR(50) NULL,
    `natural_gift_type_id` INTEGER NULL,

    INDEX `berry_ibfk_1`(`item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berry_flavor` (
    `berry_id` INTEGER NOT NULL,
    `flavor` VARCHAR(50) NOT NULL,
    `potency` INTEGER NOT NULL,

    PRIMARY KEY (`berry_id`, `flavor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characteristic` (
    `id` INTEGER NOT NULL,
    `gene_modulo` INTEGER NOT NULL,
    `highest_stat_id` INTEGER NULL,

    INDEX `characteristic_ibfk_1`(`highest_stat_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characteristic_description` (
    `characteristic_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `description` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`characteristic_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egg_group` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egg_group_name` (
    `egg_group_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`egg_group_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `encounter_method` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `order_index` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `encounter_method_name` (
    `method_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`method_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evolution_chain` (
    `id` INTEGER NOT NULL,
    `baby_trigger_item_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generation` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `main_region_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generation_name` (
    `generation_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`generation_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `growth_rate` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `formula` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `growth_rate_experience` (
    `growth_rate_id` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `experience` INTEGER NOT NULL,

    PRIMARY KEY (`growth_rate_id`, `level`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `cost` INTEGER NULL,
    `fling_power` INTEGER NULL,
    `fling_effect` VARCHAR(100) NULL,
    `category_id` INTEGER NULL,
    `sprite_url` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_attribute` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_attribute_name` (
    `attribute_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`attribute_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_category` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_category_name` (
    `category_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`category_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_effect` (
    `item_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `short_effect` TEXT NULL,
    `effect` TEXT NULL,

    PRIMARY KEY (`item_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_flavor_text` (
    `item_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `version_group_id` INTEGER NOT NULL,
    `flavor_text` TEXT NOT NULL,

    INDEX `item_flavor_text_ibfk_2`(`version_group_id`),
    PRIMARY KEY (`item_id`, `language`, `version_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_name` (
    `item_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`item_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_to_attribute` (
    `item_id` INTEGER NOT NULL,
    `attribute_id` INTEGER NOT NULL,

    INDEX `item_to_attribute_ibfk_2`(`attribute_id`),
    PRIMARY KEY (`item_id`, `attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `region_id` INTEGER NULL,

    INDEX `location_ibfk_1`(`region_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_area` (
    `id` INTEGER NOT NULL,
    `location_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `game_index` INTEGER NULL,

    INDEX `location_area_ibfk_1`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_area_name` (
    `area_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`area_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_game_index` (
    `location_id` INTEGER NOT NULL,
    `game_index` INTEGER NOT NULL,
    `generation_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`location_id`, `game_index`, `generation_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_name` (
    `location_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`location_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machine` (
    `id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `move_id` INTEGER NOT NULL,
    `version_group_id` INTEGER NOT NULL,

    INDEX `machine_ibfk_1`(`item_id`),
    INDEX `machine_ibfk_3`(`version_group_id`),
    UNIQUE INDEX `uq_machine`(`move_id`, `version_group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `power` INTEGER NULL,
    `pp` INTEGER NULL,
    `accuracy` INTEGER NULL,
    `priority` INTEGER NULL,
    `effect_chance` INTEGER NULL,
    `type_id` INTEGER NULL,
    `damage_class` VARCHAR(20) NULL,
    `target` VARCHAR(50) NULL,
    `contest_type` VARCHAR(50) NULL,
    `generation_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move_effect` (
    `move_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `short_effect` TEXT NULL,
    `effect` TEXT NULL,

    PRIMARY KEY (`move_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move_flavor_text` (
    `move_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `version_group_id` INTEGER NOT NULL,
    `flavor_text` TEXT NOT NULL,

    INDEX `move_flavor_text_ibfk_2`(`version_group_id`),
    PRIMARY KEY (`move_id`, `language`, `version_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move_meta` (
    `move_id` INTEGER NOT NULL,
    `ailment` VARCHAR(50) NULL,
    `category` VARCHAR(50) NULL,
    `min_hits` INTEGER NULL,
    `max_hits` INTEGER NULL,
    `min_turns` INTEGER NULL,
    `max_turns` INTEGER NULL,
    `drain` INTEGER NULL,
    `healing` INTEGER NULL,
    `crit_rate` INTEGER NULL,
    `ailment_chance` INTEGER NULL,
    `flinch_chance` INTEGER NULL,
    `stat_chance` INTEGER NULL,

    PRIMARY KEY (`move_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move_name` (
    `move_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`move_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move_past_value` (
    `move_id` INTEGER NOT NULL,
    `version_group_id` INTEGER NOT NULL,
    `power` INTEGER NULL,
    `pp` INTEGER NULL,
    `accuracy` INTEGER NULL,
    `effect_chance` INTEGER NULL,
    `type_id` INTEGER NULL,

    INDEX `move_past_value_ibfk_2`(`version_group_id`),
    PRIMARY KEY (`move_id`, `version_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `move_stat_change` (
    `move_id` INTEGER NOT NULL,
    `stat_name` VARCHAR(50) NOT NULL,
    `change` INTEGER NOT NULL,

    PRIMARY KEY (`move_id`, `stat_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nature` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `decreased_stat` VARCHAR(50) NULL,
    `increased_stat` VARCHAR(50) NULL,
    `hates_flavor` VARCHAR(50) NULL,
    `likes_flavor` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nature_name` (
    `nature_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`nature_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nature_pokeathlon_stat` (
    `nature_id` INTEGER NOT NULL,
    `stat_name` VARCHAR(50) NOT NULL,
    `max_change` INTEGER NOT NULL,

    PRIMARY KEY (`nature_id`, `stat_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokedex` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `is_main_series` BOOLEAN NULL,
    `region_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokedex_description` (
    `pokedex_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`pokedex_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokedex_name` (
    `pokedex_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`pokedex_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `base_experience` INTEGER NULL,
    `height` INTEGER NULL,
    `weight` INTEGER NULL,
    `is_default` BOOLEAN NULL,
    `order_index` INTEGER NULL,
    `cry_latest_url` TEXT NULL,
    `cry_legacy_url` TEXT NULL,
    `species_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_ability` (
    `pokemon_id` INTEGER NOT NULL,
    `ability_id` INTEGER NOT NULL,
    `is_hidden` BOOLEAN NULL,
    `slot` INTEGER NULL,

    INDEX `ability_id`(`ability_id`),
    PRIMARY KEY (`pokemon_id`, `ability_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_encounter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemon_id` INTEGER NOT NULL,
    `area_id` INTEGER NOT NULL,
    `method_id` INTEGER NOT NULL,
    `version` VARCHAR(30) NOT NULL,
    `min_level` TINYINT NULL,
    `max_level` TINYINT NULL,
    `chance` TINYINT NULL,

    INDEX `pokemon_encounter_ibfk_2`(`area_id`),
    INDEX `pokemon_encounter_ibfk_3`(`method_id`),
    UNIQUE INDEX `uq_encounter`(`pokemon_id`, `area_id`, `method_id`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_evolution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chain_id` INTEGER NULL,
    `from_species_id` INTEGER NULL,
    `to_species_id` INTEGER NULL,
    `trigger` VARCHAR(50) NULL,
    `min_level` INTEGER NULL,
    `min_happiness` INTEGER NULL,
    `min_beauty` INTEGER NULL,
    `min_affection` INTEGER NULL,
    `needs_overworld_rain` BOOLEAN NULL,
    `relative_physical_stats` INTEGER NULL,
    `time_of_day` VARCHAR(20) NULL,
    `turn_upside_down` BOOLEAN NULL,
    `gender` INTEGER NULL,
    `item_id` INTEGER NULL,
    `held_item_id` INTEGER NULL,
    `known_move_id` INTEGER NULL,
    `known_move_type_id` INTEGER NULL,
    `location_id` INTEGER NULL,
    `party_species_id` INTEGER NULL,
    `party_type_id` INTEGER NULL,
    `trade_species_id` INTEGER NULL,

    INDEX `chain_id`(`chain_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_form` (
    `id` INTEGER NOT NULL,
    `pokemon_id` INTEGER NOT NULL,
    `form_name` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `is_default` BOOLEAN NULL,
    `is_battle_only` BOOLEAN NULL,
    `is_mega` BOOLEAN NULL,
    `form_order` INTEGER NULL,
    `version_group_id` INTEGER NULL,

    INDEX `pokemon_id`(`pokemon_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_form_name` (
    `form_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`form_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_form_sprite` (
    `form_id` INTEGER NOT NULL,
    `slot` VARCHAR(30) NOT NULL,
    `url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`form_id`, `slot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_form_type` (
    `form_id` INTEGER NOT NULL,
    `slot` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,

    PRIMARY KEY (`form_id`, `slot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_game_index` (
    `pokemon_id` INTEGER NOT NULL,
    `version_id` INTEGER NOT NULL,
    `game_index` INTEGER NOT NULL,

    INDEX `version_id`(`version_id`),
    PRIMARY KEY (`pokemon_id`, `version_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_held_item` (
    `pokemon_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `version_id` INTEGER NOT NULL,
    `rarity` INTEGER NULL,

    INDEX `item_id`(`item_id`),
    INDEX `version_id`(`version_id`),
    PRIMARY KEY (`pokemon_id`, `item_id`, `version_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_move` (
    `pokemon_id` INTEGER NOT NULL,
    `move_id` INTEGER NOT NULL,
    `version_group_id` INTEGER NOT NULL,
    `learn_method` VARCHAR(50) NOT NULL,
    `level_learned_at` INTEGER NULL,

    INDEX `move_id`(`move_id`),
    INDEX `version_group_id`(`version_group_id`),
    PRIMARY KEY (`pokemon_id`, `move_id`, `version_group_id`, `learn_method`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_past_ability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemon_id` INTEGER NOT NULL,
    `generation_id` INTEGER NOT NULL,
    `slot` INTEGER NOT NULL,
    `ability_id` INTEGER NOT NULL,
    `is_hidden` BOOLEAN NULL,

    INDEX `ability_id`(`ability_id`),
    UNIQUE INDEX `uq_pokemon_past_ability`(`pokemon_id`, `generation_id`, `slot`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_past_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemon_id` INTEGER NOT NULL,
    `generation_id` INTEGER NOT NULL,
    `slot` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,

    INDEX `type_id`(`type_id`),
    UNIQUE INDEX `uq_pokemon_past_type`(`pokemon_id`, `generation_id`, `slot`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_pokedex_number` (
    `species_id` INTEGER NOT NULL,
    `pokedex_name` VARCHAR(50) NOT NULL,
    `entry_number` INTEGER NOT NULL,

    PRIMARY KEY (`species_id`, `pokedex_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_raw` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NULL,
    `api_data` JSON NOT NULL,
    `fetched_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_species` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `gender_rate` INTEGER NULL,
    `capture_rate` INTEGER NULL,
    `base_happiness` INTEGER NULL,
    `is_baby` BOOLEAN NULL,
    `hatch_counter` INTEGER NULL,
    `has_gender_differences` BOOLEAN NULL,
    `forms_switchable` BOOLEAN NULL,
    `is_legendary` BOOLEAN NULL,
    `is_mythical` BOOLEAN NULL,
    `order_index` INTEGER NULL,
    `generation_id` INTEGER NULL,
    `color` VARCHAR(50) NULL,
    `shape` VARCHAR(50) NULL,
    `habitat` VARCHAR(50) NULL,
    `growth_rate` VARCHAR(50) NULL,
    `evolution_chain_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_species_egg_group` (
    `species_id` INTEGER NOT NULL,
    `egg_group_id` INTEGER NOT NULL,

    PRIMARY KEY (`species_id`, `egg_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_species_flavor_text` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `species_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `game_version` VARCHAR(50) NOT NULL,
    `flavor_text` TEXT NOT NULL,

    UNIQUE INDEX `uq_species_flavor`(`species_id`, `language`, `game_version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_species_genus` (
    `species_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `genus` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`species_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_species_name` (
    `species_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`species_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_sprite` (
    `pokemon_id` INTEGER NOT NULL,
    `sprite_name` VARCHAR(150) NOT NULL,
    `url` TEXT NOT NULL,

    PRIMARY KEY (`pokemon_id`, `sprite_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_stat` (
    `pokemon_id` INTEGER NOT NULL,
    `stat_name` VARCHAR(50) NOT NULL,
    `base_stat` INTEGER NOT NULL,
    `effort` INTEGER NOT NULL,

    PRIMARY KEY (`pokemon_id`, `stat_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_type` (
    `pokemon_id` INTEGER NOT NULL,
    `type_id` INTEGER NOT NULL,
    `slot` INTEGER NULL,

    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`pokemon_id`, `type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `main_generation_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region_name` (
    `region_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`region_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seed_state` (
    `id` VARCHAR(50) NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stat` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `game_index` INTEGER NULL,
    `is_battle_only` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stat_name` (
    `stat_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`stat_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `generation_id` INTEGER NULL,
    `move_damage_class` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_efficacy` (
    `from_type_id` INTEGER NOT NULL,
    `to_type_id` INTEGER NOT NULL,
    `damage_factor` INTEGER NOT NULL,

    INDEX `type_efficacy_ibfk_2`(`to_type_id`),
    PRIMARY KEY (`from_type_id`, `to_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_name` (
    `type_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`type_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_past_efficacy` (
    `from_type_id` INTEGER NOT NULL,
    `to_type_id` INTEGER NOT NULL,
    `generation_id` INTEGER NOT NULL,
    `damage_factor` INTEGER NOT NULL,

    INDEX `type_past_efficacy_ibfk_2`(`to_type_id`),
    PRIMARY KEY (`from_type_id`, `to_type_id`, `generation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `version_group_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version_group` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `generation_id` INTEGER NULL,
    `order_index` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version_group_name` (
    `version_group_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`version_group_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `version_name` (
    `version_id` INTEGER NOT NULL,
    `language` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`version_id`, `language`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ability_effect` ADD CONSTRAINT `ability_effect_ibfk_1` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ability_flavor_text` ADD CONSTRAINT `ability_flavor_text_ibfk_1` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ability_flavor_text` ADD CONSTRAINT `ability_flavor_text_ibfk_2` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ability_name` ADD CONSTRAINT `ability_name_ibfk_1` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `berry` ADD CONSTRAINT `berry_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `berry_flavor` ADD CONSTRAINT `berry_flavor_ibfk_1` FOREIGN KEY (`berry_id`) REFERENCES `berry`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `characteristic` ADD CONSTRAINT `characteristic_ibfk_1` FOREIGN KEY (`highest_stat_id`) REFERENCES `stat`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `characteristic_description` ADD CONSTRAINT `characteristic_description_ibfk_1` FOREIGN KEY (`characteristic_id`) REFERENCES `characteristic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `egg_group_name` ADD CONSTRAINT `egg_group_name_ibfk_1` FOREIGN KEY (`egg_group_id`) REFERENCES `egg_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `encounter_method_name` ADD CONSTRAINT `encounter_method_name_ibfk_1` FOREIGN KEY (`method_id`) REFERENCES `encounter_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `generation_name` ADD CONSTRAINT `generation_name_ibfk_1` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `growth_rate_experience` ADD CONSTRAINT `growth_rate_experience_ibfk_1` FOREIGN KEY (`growth_rate_id`) REFERENCES `growth_rate`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_attribute_name` ADD CONSTRAINT `item_attribute_name_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `item_attribute`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_category_name` ADD CONSTRAINT `item_category_name_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `item_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_effect` ADD CONSTRAINT `item_effect_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_flavor_text` ADD CONSTRAINT `item_flavor_text_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_flavor_text` ADD CONSTRAINT `item_flavor_text_ibfk_2` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_name` ADD CONSTRAINT `item_name_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_to_attribute` ADD CONSTRAINT `item_to_attribute_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `item_to_attribute` ADD CONSTRAINT `item_to_attribute_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `item_attribute`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location_area` ADD CONSTRAINT `location_area_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location_area_name` ADD CONSTRAINT `location_area_name_ibfk_1` FOREIGN KEY (`area_id`) REFERENCES `location_area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location_game_index` ADD CONSTRAINT `location_game_index_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location_name` ADD CONSTRAINT `location_name_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `machine` ADD CONSTRAINT `machine_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `machine` ADD CONSTRAINT `machine_ibfk_2` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `machine` ADD CONSTRAINT `machine_ibfk_3` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_effect` ADD CONSTRAINT `move_effect_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_flavor_text` ADD CONSTRAINT `move_flavor_text_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_flavor_text` ADD CONSTRAINT `move_flavor_text_ibfk_2` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_meta` ADD CONSTRAINT `move_meta_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_name` ADD CONSTRAINT `move_name_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_past_value` ADD CONSTRAINT `move_past_value_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_past_value` ADD CONSTRAINT `move_past_value_ibfk_2` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `move_stat_change` ADD CONSTRAINT `move_stat_change_ibfk_1` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nature_name` ADD CONSTRAINT `nature_name_ibfk_1` FOREIGN KEY (`nature_id`) REFERENCES `nature`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `nature_pokeathlon_stat` ADD CONSTRAINT `nature_pokeathlon_stat_ibfk_1` FOREIGN KEY (`nature_id`) REFERENCES `nature`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokedex_description` ADD CONSTRAINT `pokedex_description_ibfk_1` FOREIGN KEY (`pokedex_id`) REFERENCES `pokedex`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokedex_name` ADD CONSTRAINT `pokedex_name_ibfk_1` FOREIGN KEY (`pokedex_id`) REFERENCES `pokedex`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon` ADD CONSTRAINT `pokemon_species_id_fkey` FOREIGN KEY (`species_id`) REFERENCES `pokemon_species`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_ability` ADD CONSTRAINT `pokemon_ability_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_ability` ADD CONSTRAINT `pokemon_ability_ibfk_2` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_encounter` ADD CONSTRAINT `pokemon_encounter_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_encounter` ADD CONSTRAINT `pokemon_encounter_ibfk_2` FOREIGN KEY (`area_id`) REFERENCES `location_area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_encounter` ADD CONSTRAINT `pokemon_encounter_ibfk_3` FOREIGN KEY (`method_id`) REFERENCES `encounter_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_form` ADD CONSTRAINT `pokemon_form_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_game_index` ADD CONSTRAINT `pokemon_game_index_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_game_index` ADD CONSTRAINT `pokemon_game_index_ibfk_2` FOREIGN KEY (`version_id`) REFERENCES `version`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_held_item` ADD CONSTRAINT `pokemon_held_item_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_held_item` ADD CONSTRAINT `pokemon_held_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_held_item` ADD CONSTRAINT `pokemon_held_item_ibfk_3` FOREIGN KEY (`version_id`) REFERENCES `version`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_move` ADD CONSTRAINT `pokemon_move_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_move` ADD CONSTRAINT `pokemon_move_ibfk_2` FOREIGN KEY (`move_id`) REFERENCES `move`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_move` ADD CONSTRAINT `pokemon_move_ibfk_3` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_past_ability` ADD CONSTRAINT `pokemon_past_ability_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_past_ability` ADD CONSTRAINT `pokemon_past_ability_ibfk_2` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_past_type` ADD CONSTRAINT `pokemon_past_type_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_past_type` ADD CONSTRAINT `pokemon_past_type_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_sprite` ADD CONSTRAINT `pokemon_sprite_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_stat` ADD CONSTRAINT `pokemon_stat_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_type` ADD CONSTRAINT `pokemon_type_ibfk_1` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pokemon_type` ADD CONSTRAINT `pokemon_type_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `region_name` ADD CONSTRAINT `region_name_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stat_name` ADD CONSTRAINT `stat_name_ibfk_1` FOREIGN KEY (`stat_id`) REFERENCES `stat`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_efficacy` ADD CONSTRAINT `type_efficacy_ibfk_1` FOREIGN KEY (`from_type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_efficacy` ADD CONSTRAINT `type_efficacy_ibfk_2` FOREIGN KEY (`to_type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_name` ADD CONSTRAINT `type_name_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_past_efficacy` ADD CONSTRAINT `type_past_efficacy_ibfk_1` FOREIGN KEY (`from_type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `type_past_efficacy` ADD CONSTRAINT `type_past_efficacy_ibfk_2` FOREIGN KEY (`to_type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `version_group_name` ADD CONSTRAINT `version_group_name_ibfk_1` FOREIGN KEY (`version_group_id`) REFERENCES `version_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `version_name` ADD CONSTRAINT `version_name_ibfk_1` FOREIGN KEY (`version_id`) REFERENCES `version`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
