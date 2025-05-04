import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GiftBox } from "@/types/bundle/types";

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

/** 보따리 최초 생성 상태를 관리하는 store */
interface BundleCreateState {
  isCreatingBundle: boolean;
  setIsCreatingBundle: (value: boolean) => void;
}

export const useCreatingBundleStore = create<BundleCreateState>((set) => ({
  isCreatingBundle: false,
  setIsCreatingBundle: (value) => set({ isCreatingBundle: value }),
}));

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),
}));

/** 임시저장 하기 전 기준의 giftBoxes를 저장 */
interface SnapshotGiftBoxesStore {
  snapshotGiftBoxes: GiftBox[] | null;
  setSnapshotGiftBoxes: (boxes: GiftBox[] | null) => void;
}

export const useSnapshotGiftBoxesStore = create<SnapshotGiftBoxesStore>()(
  persist(
    (set) => ({
      snapshotGiftBoxes: null,
      setSnapshotGiftBoxes: (boxes) => set({ snapshotGiftBoxes: boxes }),
    }),
    { name: "creating-bundle" },
  ),
);
