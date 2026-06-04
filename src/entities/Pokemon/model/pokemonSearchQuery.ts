export type SortOrder = 'asc' | 'desc';
export type SortBy = 'id' | 'name';
export type EvolutionStage = 'base' | 'stage1' | 'stage2';

export type PokemonSearchQuery = {
  search?: string;
  types?: string[];
  generation?: number[];
  rarity?: string[];
  colors?: string[];
  habitat?: string[];
  shape?: string[];
  isBaby?: boolean;
  locationIds?: number[];
  evolutionStage?: EvolutionStage;
  page?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};
