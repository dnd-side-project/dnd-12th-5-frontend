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

interface IsOpenDetailGiftBoxStore {
  isOpenDetailGiftBox: boolean;
  setIsOpenDetailGiftBox: (isOpen: boolean) => void;
}

export const useIsOpenDetailGiftBoxStore = create<IsOpenDetailGiftBoxStore>(
  (set) => ({
    isOpenDetailGiftBox: false,
    setIsOpenDetailGiftBox: (isOpen) => set({ isOpenDetailGiftBox: isOpen }),
  }),
);
