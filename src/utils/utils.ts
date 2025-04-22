import { deleteCookie, setCookie } from "cookies-next";

import { useGiftStore } from "@/stores/gift-upload/useStore";

/** accessToken, refreshToken 삭제 */
export const deleteToken = () => {
  deleteCookie("accessToken", { path: "/" });
  deleteCookie("refreshToken", { path: "/" });
};

export const setToken = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
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
