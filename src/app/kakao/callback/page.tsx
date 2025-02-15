"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams?.get("code");

  const { mutate } = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch("/api/v1/oauth/login", {
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
      console.log(data);

      // 토큰 저장
      localStorage.setItem("accessToken", data.result.accessToken);
      localStorage.setItem("refreshToken", data.result.refreshToken);

      toast({
        title: "로그인 성공",
        description: "로그인 되었습니다.",
      });

      router.push("/"); // 로그인 후 홈으로
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  useEffect(() => {
    console.log("Code", code);

    if (code) {
      mutate(code);
    }
  }, [code]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default Page;
