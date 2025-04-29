import axios from "axios";

import { PICKTORY_API } from "../api-url";
import { handleAxiosError } from "@/utils/axios";

export const kakaoLogin = async (code: string) => {
  try {
    const response = await axios.post(
      PICKTORY_API.login,
      {
        code,
      },
      {
        baseURL: `${process.env.NEXT_PUBLIC_API_BASE_PATH}`,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error, "카카오 로그인 실패");
  }
};
