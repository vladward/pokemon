import { fetchWithRetry } from './seed-utils';

export async function loadPokemonList(
  limit: number,
  offset: number,
): Promise<Record<string, unknown>> {
  return fetchWithRetry(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
}

export async function loadPokemon(url: string): Promise<Record<string, unknown>> {
  return fetchWithRetry(url);
}

export async function loadSpecies(url: string): Promise<Record<string, unknown>> {
  return fetchWithRetry(url);
}

export async function loadEvolutionChain(url: string): Promise<Record<string, unknown>> {
  return fetchWithRetry(url);
}
