import { findAvailableRarities } from './rarityRepository';

export async function getRarityList() {
  return findAvailableRarities();
}
