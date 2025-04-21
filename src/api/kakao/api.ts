import { PICKTORY_API } from "../api-url";
import axiosInstance from "../axiosInstance";
import { handleAxiosError } from "@/utils/axios";

export const kakaoLogin = async (code: string) => {
  try {
    const response = await axiosInstance.post(PICKTORY_API.login, {
      code: code,
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error, "카카오 로그인 실패");
  }
};
