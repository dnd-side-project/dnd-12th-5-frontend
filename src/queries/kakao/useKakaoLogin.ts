import { useMutation } from "@tanstack/react-query";

import { kakaoLogin } from "@/api/kakao/api";

interface KakaoLoginResponse {
  result: {
    accessToken: string;
    refreshToken: string;
  };
}

export const useKakaoLogin = (
  onSuccess: (data: KakaoLoginResponse) => void,
  onError?: (error: unknown) => void,
) => {
  return useMutation<KakaoLoginResponse, unknown, string>({
    mutationFn: kakaoLogin,
    onSuccess,
    onError,
  });
};
