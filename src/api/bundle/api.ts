import { PICKTORY_API } from "../api-url";
import axiosInstance from "../axiosInstance";
import { BUNDLE_COLORS } from "@/constants/constants";
import {
  GiftWithResponseTag,
  GiftBox,
  PutCharacterPayload,
  PutCharacterResponse,
  ReceiveBundle,
} from "@/types/bundle/types";
import { handleAxiosError } from "@/utils/axios";

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
  try {
    const response = await axiosInstance.post(PICKTORY_API.postBundles, {
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
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error, "보따리 만들기 실패");
  }
};

/** 보따리 업데이트 api */
export const updateBundle = async (giftBoxes: GiftBox[]) => {
  try {
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

    const response = await axiosInstance.put(
      PICKTORY_API.putBundlesUpdate(bundleId),
      {
        bundleId,
        gifts,
      },
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error, "보따리 업데이트 실패");
  }
};

/** 보따리 마저 채우기 api */
export const getDraftBundleGifts = async (bundleId: number) => {
  try {
    if (!bundleId) return;

    const response = await axiosInstance.get(
      PICKTORY_API.getDraftBundleGifts(bundleId),
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error, "임시 보따리 불러오기 실패");
  }
};

/** 배달부 설정 api */
export const putDeliveryCharacter = async ({
  bundleId,
  deliveryCharacterType,
}: PutCharacterPayload): Promise<PutCharacterResponse> => {
  try {
    const response = await axiosInstance.put(
      PICKTORY_API.putDeliveryCharacter(bundleId),
      {
        deliveryCharacterType,
      },
    );

    return response.data;
  } catch (error) {
    throw handleAxiosError(error, "배달부 설정 실패");
  }
};

/** ----------- Response ----------- */

/** 보따리 풀어보기 api */
export const fetchResponseBundle = async (link: string) => {
  try {
    const response = await axiosInstance.get(PICKTORY_API.openBundle(link));

    const bundleData = response.data.result.bundle as ReceiveBundle;

    if (bundleData?.id) {
      sessionStorage.setItem("receiveBundleId", bundleData.id.toString());
    }

    return bundleData;
  } catch (error) {
    handleAxiosError(error, "보따리 불러오기 실패");
  }
};

/** 답변 전송 api */
export const postBundleAnswers = async (
  link: string,
  data: {
    bundleId: number;
    gifts: { giftId: number; responseTag: string }[];
  },
) => {
  try {
    const response = await axiosInstance.post(
      PICKTORY_API.postBundleAnswer(link),
      data,
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error, "답변 전송 실패");
  }
};

/** 제출한 응답 조희 */
export const getSubmittedAnswers = async (
  link: string,
): Promise<GiftWithResponseTag[]> => {
  try {
    const response = await axiosInstance.get(
      PICKTORY_API.getSubmittedAnswers(link),
    );
    return response.data.result.gifts;
  } catch (error) {
    throw handleAxiosError(error, "내가 제출한 응답 조회 실패");
  }
};
