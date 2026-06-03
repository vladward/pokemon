import { getGenerationList, getRarityList, getTypeList } from '@/entities/Pokemon';
import { getPokemonList } from '@/entities/Pokemon';

export async function GET() {
  const results: Record<string, unknown> = {};

  try {
    const list = await getPokemonList({ page: 1, sortBy: 'id', sortOrder: 'asc' });
    results.pokemon_ok = true;
    results.pokemon_count = list.total;
  } catch (e) {
    results.pokemon_ok = false;
    results.pokemon_error = String(e);
  }

  try {
    results.types = await getTypeList();
    results.types_ok = true;
  } catch (e) {
    results.types_ok = false;
    results.types_error = String(e);
  }

  try {
    results.rarities = await getRarityList();
    results.rarities_ok = true;
  } catch (e) {
    results.rarities_ok = false;
    results.rarities_error = String(e);
  }

  try {
    results.generations = await getGenerationList();
    results.generations_ok = true;
  } catch (e) {
    results.generations_ok = false;
    results.generations_error = String(e);
  }

  return Response.json(results);
}
