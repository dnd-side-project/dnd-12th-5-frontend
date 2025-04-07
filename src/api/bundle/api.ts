import { BUNDLE_COLORS } from "@/constants/constants";
import { GiftBox, ReceiveBundle } from "@/types/bundle/types";
import { getCookie } from "cookies-next";
import { PICKTORY_API } from "../api-url";

/** 보따리 생성 api */

export const createBundle = async ({
  bundleName,
  selectedBagIndex,
  giftBoxes,
}: {
  bundleName: string;
  selectedBagIndex: number;
  giftBoxes: GiftBox[];
}) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.postBundles, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: bundleName,
      designType: BUNDLE_COLORS[selectedBagIndex] || "RED",
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

/** 보따리 업데이트 api */

export const updateBundle = async (giftBoxes: GiftBox[]) => {
  const accessToken = getCookie("accessToken");

  const bundleIdStr = sessionStorage.getItem("bundleId");

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

  const response = await fetch(PICKTORY_API.putBundlesUpdate(bundleId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`서버 오류: ${response.status}`);
  }

  return await response.json();
};

/** 보따리 풀어보기 api */

export const fetchResponseBundle = async (link: string) => {
  try {
    const response = await fetch(PICKTORY_API.openBundle(link), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    const bundleData = jsonData.result.bundle as ReceiveBundle;

    if (bundleData?.id) {
      sessionStorage.setItem("receiveBundleId", bundleData.id.toString());
    }

    return bundleData;
  } catch (error) {
    console.error(`보따리 불러오기 실패 ${error}`);
    return null;
  }
};

/**보따리 결과 확인하기 api */

export interface GiftData {
  id: number;
  name: string;
  link: string;
  thumbnail: string;
  purchaseUrl: string;
  responseTag: string;
}

/** 보따리 결과 조회 */

export const fetchGiftResults = async (id: number): Promise<GiftData[]> => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getBundleResult(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("보따리 결과 확인하기에 실패하셨습니다.");
  }

  const jsonData = await response.json();
  return jsonData.result.gifts;
};
