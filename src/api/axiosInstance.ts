import axios from "axios";
import { getCookie } from "cookies-next";

import { toast } from "@/hooks/use-toast";
import { deleteToken, setToken } from "@/utils/tokenUtils";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 토큰 동적으로 주입
axiosInstance.interceptors.request.use(
  (config) => {
    // 인증 토큰이 필요하지 않는 API
    const isPublicApi = config.url?.startsWith("/responses");

    if (!isPublicApi) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } else {
      // 토큰이 들어있을 경우 제거
      if (config.headers?.Authorization) {
        delete config.headers.Authorization;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// accessToken 만료 시 refreshToken으로 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 인가 코드 요청은 refresh 로직에서 제외
    if (
      originalRequest.url.includes("/oauth/login") ||
      originalRequest.url.includes("/kakao/callback")
    ) {
      return Promise.reject(error);
    }

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

        // 새 Token 저장
        setToken(newAccessToken, newRefreshToken);

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
