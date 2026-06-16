import type { TPokemonCard } from './TPokemonCard';

export type TAbility = {
  id: number;
  name: string;
  isHidden: boolean;
  shortEffect: string | null;
};

export type TEvolutionStep = {
  fromSpeciesId: number;
  toSpeciesId: number;
  trigger: string | null;
  minLevel: number | null;
};

export type TEvolutionNode = {
  speciesId: number;
  pokemonId: number;
  name: string;
  sprite: string | null;
  isCurrent: boolean;
};

export type TForm = {
  pokemonId: number;
  name: string;
  sprite: string | null;
  isCurrent: boolean;
};

export type TBiology = {
  genus: string | null;
  height: number;
  weight: number;
  eggGroups: string[];
  catchRate: number | null;
  baseHappiness: number | null;
  hatchCounter: number | null;
  shape: string | null;
  color: string | null;
  habitat: string | null;
};

export type TPokemonDetails = Omit<TPokemonCard, 'stats'> & {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  flavorText: string | null;
  abilities: TAbility[];
  biology: TBiology;
  evolutions: TEvolutionNode[];
  evolutionSteps: TEvolutionStep[];
  locations: string[];
  forms: TForm[];
};
