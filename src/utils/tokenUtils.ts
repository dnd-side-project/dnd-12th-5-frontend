import { deleteCookie, setCookie } from "cookies-next";

/** accessToken, refreshToken 삭제 */
export const deleteToken = () => {
  deleteCookie("accessToken", { path: "/" });
  deleteCookie("refreshToken", { path: "/" });
};

/** token 저장 */
export const setToken = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};
