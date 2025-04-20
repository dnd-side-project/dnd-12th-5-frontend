import axios from "axios";

/** 공통 에러 핸들링 함수 */
export const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || defaultMessage;

    console.error(`Axios error [${status}]:`, message);
  } else {
    console.error("Unexpected error:", error);
  }
  throw new Error(defaultMessage);
};
