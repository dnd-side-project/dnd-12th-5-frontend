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

{
  /* 보따리 업데이트 api */
}
export const updateGiftBag = async (giftBoxes: GiftBox[]) => {
  const bundleId = sessionStorage.getItem("giftBagId");

  if (!bundleId) {
    throw new Error("선물 보따리 ID가 없습니다.");
  }

  const gifts = giftBoxes.map((gift) => ({
    id: gift.id,
    name: gift.name,
    message: gift.reason,
    purchaseUrl: gift.purchase_url,
    imageUrls: gift.imgUrls,
  }));

  const requestBody = {
    bundleId,
    gifts,
  };

  const response = await fetch(`/api/v1/bundles/${bundleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`서버 오류: ${response.status}`);
  }

  return await response.json();
};
