import { create } from "zustand";

interface Store {
  selectedChipIndex: number;
  setSelectedChipIndex: (index: number) => void;
}

export const useStore = create<Store>((set) => ({
  selectedChipIndex: 0,
  setSelectedChipIndex: (index) => set({ selectedChipIndex: index }),
}));

interface GiftBox {
  filled: boolean;
  reason: string;
}

interface GiftStore {
  giftBoxes: GiftBox[];
  updateGiftBox: (index: number, reason: string) => void;
}

export const useGiftStore = create<GiftStore>((set) => ({
  giftBoxes: Array(6).fill({ filled: false, reason: "" }),
  updateGiftBox: (index, reason) =>
    set((state) => {
      const updatedBoxes = [...state.giftBoxes];
      updatedBoxes[index] = { filled: true, reason };
      return { giftBoxes: updatedBoxes };
    }),
}));
