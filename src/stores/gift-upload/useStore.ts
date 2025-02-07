import { GiftBox } from "@/types/giftbag/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TagIndexStore {
  selectedTagIndex: number;
  setSelectedTagIndex: (index: number) => void;
}

export const useTagIndexStore = create<TagIndexStore>((set) => ({
  selectedTagIndex: 0,
  setSelectedTagIndex: (index) => set({ selectedTagIndex: index }),
}));

interface GiftStore {
  giftBoxes: GiftBox[];
  updateGiftBox: (index: number, data: Partial<GiftBox>) => void;
}

export const useGiftStore = create<GiftStore>()(
  persist(
    (set) => ({
      giftBoxes: Array(6).fill({
        name: "",
        filled: false,
        reason: "",
        tagIndex: 0,
      }),

      updateGiftBox: (index, data) =>
        set((state) => {
          const updatedBoxes = [...state.giftBoxes];
          updatedBoxes[index] = {
            ...updatedBoxes[index],
            ...data,
          };
          return { giftBoxes: updatedBoxes };
        }),
    }),
    { name: "gift-storage" },
  ),
);

interface EditBoxStore {
  isBoxEditing: boolean;
  setIsBoxEditing: (isEditing: boolean) => void;
}

export const useEditBoxStore = create<EditBoxStore>()(
  persist(
    (set) => ({
      isBoxEditing: false,
      setIsBoxEditing: (isBoxEditing) => set({ isBoxEditing }),
    }),
    { name: "edit-storage" },
  ),
);
