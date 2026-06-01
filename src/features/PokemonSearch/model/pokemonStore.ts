import { create } from 'zustand/react';

interface PokemonFilterState {
  search: string;
  setSearch: (search: string) => void;
}

export const usePokemonStore = create<PokemonFilterState>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
}));
