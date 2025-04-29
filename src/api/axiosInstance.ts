import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

import { toast } from "@/hooks/use-toast";
import { deleteToken } from "@/utils/utils";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const accessToken = getCookie("accessToken");

// accessToken이 있다면 기본 헤더에 Authorization 설정
if (accessToken) {
  axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
}

// accessToken 만료 시 refreshToken으로 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken이 만료되어 401을 받은 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한루프 방지용 flag
    ) {
      originalRequest._retry = true;

      console.log("accessToken이 만료되었습니다.", error);

      try {
        const refreshToken = getCookie("refreshToken");

        if (!refreshToken) {
          console.log("refreshToken 없음. 로그아웃.", refreshToken);
          deleteToken();
          toast({ title: "다시 로그인해 주세요." });
          return (window.location.href = "/auth/login");
        }

        // refreshToken으로 accessToken 재발급 요청
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_PATH}/auth/refresh`,
          {
            refreshToken, // body
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("재발급 요청에 성공하였습니다.", res.data);

        const newAccessToken = res.data.result.accessToken;
        const newRefreshToken = res.data.result.refreshToken;

        // 새 accessToken 저장
        setCookie("accessToken", newAccessToken);
        setCookie("refreshToken", newRefreshToken);

        console.log("저장 완료! 재요청합니다.");

        // 원래 요청에 새 accessToken 넣어서 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("refreshToken 오류", refreshError);

        deleteToken(); // 로그아웃
        toast({ title: "장기간 사용하지 않아 로그아웃 되었습니다." });

        return (window.location.href = "/auth/login");
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
