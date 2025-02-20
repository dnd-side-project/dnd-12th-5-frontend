/** accessToken, refreshToken 삭제 */
export const deleteToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
