import { GIFTBAG_COLORS } from "@/constants/constants";
import { GiftBox, ReceiveGiftBag } from "@/types/giftbag/types";

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
  const bundleIdStr = sessionStorage.getItem("giftBagId");

  if (!bundleIdStr) {
    throw new Error("선물 보따리 ID가 없습니다.");
  }

  const bundleId = parseInt(bundleIdStr, 10);

  if (isNaN(bundleId)) {
    throw new Error("유효하지 않은 선물 보따리 ID입니다.");
  }

  const gifts = giftBoxes
    .filter((gift) => gift.filled)
    .map((gift) => ({
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

{
  /** 보따리 풀어보기 api */
}
export const fetchResponseBundle = async (link: string) => {
  try {
    const response = await fetch(`/api/v1/responses/bundles/${link}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.result.bundle as ReceiveGiftBag;
  } catch (error) {
    console.error(`보따리 불러오기 실패 ${error}`);
    return null;
  }
};
