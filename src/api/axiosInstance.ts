import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const token = getCookie("accessToken");

// accessToken이 있다면 기본 헤더에 Authorization 설정
if (token) {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
}

export default axiosInstance;
