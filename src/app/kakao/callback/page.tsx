"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import Loading from "@/components/common/Loading";
import { toast } from "@/hooks/use-toast";
import { useKakaoLogin } from "@/queries/kakao/useKakaoLogin";
import { handleAxiosError } from "@/utils/axios";
import { setToken } from "@/utils/utils";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams?.get("code");

  const { mutate } = useKakaoLogin(
    (data) => {
      const accessToken = data.result.accessToken;
      const refreshToken = data.result.refreshToken;

      setToken(accessToken, refreshToken);

      toast({ title: "로그인 성공!" });
      router.push("/home");
    },
    (error) => {
      handleAxiosError(error, "카카오 로그인 실패");
    },
  );

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loading />
    </div>
  );
};

export default Page;
