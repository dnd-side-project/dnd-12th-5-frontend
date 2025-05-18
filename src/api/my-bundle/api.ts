import { ResultGiftBox } from "@/types/bundle/types";
import { handleAxiosError } from "@/utils/axios";

import { PICKTORY_API } from "../api-url";
import axiosInstance from "../axiosInstance";

/** 메인화면 보따리 조회 api */
export const getBundlesPreview = async () => {
  try {
    const response = await axiosInstance.get(PICKTORY_API.getBundlesPreview);

    return response.data;
  } catch (error) {
    handleAxiosError(error, "보따리 프리뷰 불러오기 실패");
  }
};

/** 보따리 목록 조회 api */
export const getMyBundles = async () => {
  try {
    const response = await axiosInstance.get(PICKTORY_API.getMyBundles);

    return response.data;
  } catch (error) {
    handleAxiosError(error, "내 보따리 목록 조회 실패");
  }
};

/** 보따리 간이 조회 api */
export const getMyBundleDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      PICKTORY_API.getMyBundleDetail(id),
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error, "보따리 상세 조회 실패");
  }
};

/** 보따리 이름 수정 api */
export const patchBundleName = async (bundleId: string, name: string) => {
  try {
    await axiosInstance.patch(PICKTORY_API.patchBundleName(bundleId), { name });
  } catch (error) {
    handleAxiosError(error, "보따리 이름 수정 실패");
  }
};

/** 보따리 삭제 */
export const deleteMyBundle = async (bundleId: number) => {
  try {
    await axiosInstance.delete(PICKTORY_API.deleteMyBundle(bundleId));
  } catch (error) {
    handleAxiosError(error, "보따리 삭제 실패");
  }
};

/** 보따리 결과 조회 */
export const getBundleResult = async (id: number): Promise<ResultGiftBox[]> => {
  try {
    const response = await axiosInstance.get(PICKTORY_API.getBundleResult(id));
    return response.data.result.gifts;
  } catch (error) {
    throw handleAxiosError(error, "보따리 결과 조회 실패");
  }
};

/** 보따리 선물 상세 조회 api */
export const getGiftDetail = async (giftId: number, bundleId: number) => {
  try {
    const response = await axiosInstance.get(
      PICKTORY_API.getGiftDetail(bundleId, giftId),
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "선물 상세 조회 실패");
  }
};
