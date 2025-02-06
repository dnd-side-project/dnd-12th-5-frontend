import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  selectedBagIndex: number;
  setSelectedBagIndex: (index: number) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      selectedBagIndex: 0,
      setSelectedBagIndex: (index) => set({ selectedBagIndex: index }),
    }),
    { name: "selectedBag-storage" },
  ),
);
