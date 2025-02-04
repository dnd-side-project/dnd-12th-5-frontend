import { create } from "zustand";

interface Store {
  selectedChipIndex: number;
  setSelectedChipIndex: (index: number) => void;
}

export const useStore = create<Store>((set) => ({
  selectedChipIndex: 0,
  setSelectedChipIndex: (index) => set({ selectedChipIndex: index }),
}));
