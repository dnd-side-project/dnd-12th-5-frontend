import { GIFTBAG_COLORS } from "@/constants/constants";
import { GiftBox } from "@/types/giftbag/types";

{
  /** 보따리 생성 api */
}
export const createGiftBag = async ({
  giftBagName,
  selectedBagIndex,
  giftBoxes,
}: {
  giftBagName: string;
  selectedBagIndex: number;
  giftBoxes: GiftBox[];
}) => {
  const response = await fetch("/api/v1/bundles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({
      name: giftBagName,
      designType: GIFTBAG_COLORS[selectedBagIndex] || "RED",
      gifts: giftBoxes
        .filter((gift) => gift.name.trim() !== "")
        .map((gift) => ({
          name: gift.name,
          message: gift.reason,
          purchaseUrl: gift.purchase_url,
          imageUrls: gift.imgUrls,
        })),
    }),
  });

  if (!response.ok) {
    throw new Error("보따리 만들기 실패");
  }

  return response.json();
};
