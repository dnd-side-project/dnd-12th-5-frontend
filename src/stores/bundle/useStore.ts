import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SelectedBagStore {
  selectedBagIndex: number;
  setSelectedBagIndex: (index: number) => void;
}

export const useSelectedBagStore = create<SelectedBagStore>()(
  persist(
    (set) => ({
      selectedBagIndex: 0,
      setSelectedBagIndex: (index) => set({ selectedBagIndex: index }),
    }),
    { name: "selectedBag-storage" },
  ),
);

interface BundleState {
  bundleName: string;
  setBundleName: (name: string) => void;
}

export const useBundleNameStore = create<BundleState>()(
  persist(
    (set) => ({
      bundleName: "",
      setBundleName: (name) => set({ bundleName: name }),
    }),
    {
      name: "bundle-name",
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
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

interface SelectedGiftBoxStore {
  selectedGiftIndex: number | null;
  setSelectedGiftIndex: (index: number | null) => void;
}

export const useSelectedGiftBoxStore = create<SelectedGiftBoxStore>((set) => ({
  selectedGiftIndex: null,
  setSelectedGiftIndex: (index) => set({ selectedGiftIndex: index }),
}));

// 내가 담았던 선물 이름
interface GiftName {
  giftName: string;
  setGiftName: (name: string) => void;
}

export const useGiftNameStore = create<GiftName>()(
  persist(
    (set) => ({
      giftName: "",
      setGiftName: (name) => set({ giftName: name }),
    }),
    {
      name: "gift-name",
    },
  ),
);

interface IsUploadAnswerStore {
  isUploadedAnswer: boolean;
  setIsUploadedAnswer: (isUploaded: boolean) => void;
}

export const useIsUploadAnswerStore = create<IsUploadAnswerStore>()(
  persist(
    (set) => ({
      isUploadedAnswer: false,
      setIsUploadedAnswer: (isUploaded) =>
        set({ isUploadedAnswer: isUploaded }),
    }),
    {
      name: "uploaded-answer",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

interface IsClickedUpdateFilledButtonStore {
  isClickedUpdateFilledButton: boolean;
  setIsClickedUpdateFilledButton: (isClicked: boolean) => void;
}

export const useIsClickedUpdateFilledButton =
  create<IsClickedUpdateFilledButtonStore>()(
    persist(
      (set) => ({
        isClickedUpdateFilledButton: false,
        setIsClickedUpdateFilledButton: (isClicked) =>
          set({ isClickedUpdateFilledButton: isClicked }),
      }),
      {
        name: "cilcked-updateFilledButton",
      },
    ),
  );

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),
}));
