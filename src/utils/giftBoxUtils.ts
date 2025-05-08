import { useGiftStore } from "@/stores/gift-upload/useStore";
import { GiftBox } from "@/types/bundle/types";

/** 선물상자 초기화 */
export const resetGiftBoxes = () => {
  useGiftStore.setState({
    giftBoxes: Array(6).fill({
      name: "",
      filled: false,
      reason: "",
      tagIndex: 0,
      purchase_url: "",
      tag: "",
      imgUrls: [],
      id: null,
    }),
  });
};

/** 선물상자 상태 업데이트 */
export const updateGiftBoxesFromResponse = (gifts: GiftBox[]) => {
  gifts.forEach((gift, index) => {
    useGiftStore.getState().updateGiftBox(index, { id: gift.id });
  });
};

/** 선물상자 링크 유효성 검사 */
export const linkRegex = (link: string) => {
  if (!link) return true;
  try {
    const url = new URL(link.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};
