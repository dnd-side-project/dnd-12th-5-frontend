import { create } from "zustand";

interface Store {
  selectedBagIndex: number;
  setSelectedBagIndex: (index: number) => void;
}

export const useStore = create<Store>((set) => ({
  selectedBagIndex: 0,
  setSelectedBagIndex: (index) => set({ selectedBagIndex: index }),
}));
