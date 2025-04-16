import { getCookie } from "cookies-next";

import { PICKTORY_API } from "../api-url";
import { BUNDLE_COLORS } from "@/constants/constants";
import {
  GiftBox,
  PutCharacterPayload,
  PutCharacterResponse,
  ReceiveBundle,
  ResultGiftBox,
} from "@/types/bundle/types";

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

/** 보따리 마저 채우기 api */
export const getDraftBundleGifts = async (bundleId: number) => {
  const accessToken = getCookie("accessToken");

  if (!bundleId) return;

  const response = await fetch(PICKTORY_API.getDraftBundleGifts(bundleId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
};

/** 배달부 설정 api */
export const putDeliveryCharacter = async ({
  bundleId,
  deliveryCharacterType,
}: PutCharacterPayload): Promise<PutCharacterResponse> => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.putDeliveryCharacter(bundleId), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deliveryCharacterType: deliveryCharacterType }),
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
};

/** 메인화면 보따리 조회 api */
export const getBundlesPreview = async () => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getBundlesPreview, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

/** 보따리 목록 조회 api */
export const getMyBundles = async () => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getMyBundles, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

/** 보따리 간이 조회 api */
export const getMyBundleDetail = async (id: number) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getMyBundleDetail(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  return response.json();
};

/** 보따리 삭제 */
export const deleteMyBundle = async (bundleId: number) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.deleteMyBundle(bundleId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("보따리 삭제에 실패했습니다.");
  }
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

/** 보따리 결과 조회 */
export const getBundleResult = async (id: number): Promise<ResultGiftBox[]> => {
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

/** 보따리 선물 상세 조회 api */
export const getGiftDetail = async (giftId: number, bundleId: number) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getGiftDetail(bundleId, giftId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
};
