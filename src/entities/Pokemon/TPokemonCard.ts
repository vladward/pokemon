export type TPokemonCard = {
  id: number;
  name: string;
  types: string[];
  sprite: string | null;
  spriteArtwork: string | null;
  spriteDreamWorld: string | null;
  generation: number | null;
  region: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythical';
  evolutionStage: 'base' | 'stage1' | 'stage2' | null;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
};
