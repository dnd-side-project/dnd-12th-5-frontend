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

interface GiftBagState {
  giftBagName: string;
  setGiftBagName: (name: string) => void;
}

export const useGiftBagStore = create<GiftBagState>()(
  persist(
    (set) => ({
      giftBagName: "",
      setGiftBagName: (name) => set({ giftBagName: name }),
    }),
    {
      name: "giftbag-name",
    },
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

interface GiftAnswerStore {
  answers: { [key: number]: number };
  setAnswer: (giftIndex: number, answerIndex: number) => void;
}

export const useGiftAnswerStore = create(
  persist<GiftAnswerStore>(
    (set) => ({
      answers: {},
      setAnswer: (giftIndex, answerIndex) =>
        set((state) => ({
          answers: { ...state.answers, [giftIndex]: answerIndex },
        })),
    }),
    {
      name: "gift-answers",
    },
  ),
);

interface SelectedGiftBoxState {
  selectedGiftIndex: number | null;
  setSelectedGiftIndex: (index: number | null) => void;
}

export const useSelectedGiftBoxStore = create<SelectedGiftBoxState>((set) => ({
  selectedGiftIndex: null,
  setSelectedGiftIndex: (index) => set({ selectedGiftIndex: index }),
}));
