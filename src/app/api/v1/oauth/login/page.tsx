// 리다이렉트 페이지

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams ? searchParams.get("code") : null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch(`${API_URL}/api/v1/oauth/login`, {
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
      // 토큰 저장
      localStorage.setItem("accessToken", data.result.accessToken);
      localStorage.setItem("refreshToken", data.result.refreshToken);

      toast({
        title: "로그인 성공",
        description: "로그인 되었습니다.",
      });

      router.push("/"); // 로그인 후 홈으로 리다이렉션
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

  // 로딩 처리
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-[260px] h-[260px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Page;
