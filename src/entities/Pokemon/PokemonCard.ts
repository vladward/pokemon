export type PokemonCard = {
  id: number;
  name: string;
  types: string[];
  sprite: string | null;
  generation: number | null;
  region: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythical';
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
};
