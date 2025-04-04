"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import { toast } from "@/hooks/use-toast";
import { setToken } from "@/utils/utils";
import { PICKTORY_API } from "@/api/api-url";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams?.get("code");

  /** 카카오 로그인 api */
  const { mutate } = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch(PICKTORY_API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code: code }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        return data;
      } catch {
        throw new Error("응답 처리 실패");
      }
    },
    onSuccess: (data) => {
      const accessToken = data.result.accessToken;
      const refreshToken = data.result.refreshToken;

      setToken(accessToken, refreshToken);

      toast({
        title: "로그인 성공",
        description: "로그인 되었습니다.",
      });

      router.push("/home"); // 로그인 후 홈으로
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default Page;
