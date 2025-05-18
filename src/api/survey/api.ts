import { PICKTORY_API } from "../api-url";
import axiosInstance from "../axiosInstance";
import { handleAxiosError } from "@/utils/axios";

/** 설문조사 대상자 검사 api */
export const getIsSurveyTarget = async () => {
  try {
    const response = await axiosInstance.get(PICKTORY_API.getIsSurveyTarget);

    return response.data;
  } catch (error) {
    handleAxiosError(error, "설문조사 대상자 검사 실패");
  }
};

export const postSurveyAnswer = async (data: {
  surveySatisfaction: string;
}) => {
  try {
    const response = await axiosInstance.post(
      PICKTORY_API.postSurveyAnswer,
      data,
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error, "설문조사 응답 제출 실패");
  }
};
