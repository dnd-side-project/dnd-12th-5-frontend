import { useGiftStore } from '@/stores/gift-upload/useStore';
import { deleteCookie } from "cookies-next";

/** accessToken, refreshToken 삭제 */
export const deleteToken = () => {
  deleteCookie("accessToken", { path: "/" });
  deleteCookie("refreshToken", { path: "/" });
};

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
