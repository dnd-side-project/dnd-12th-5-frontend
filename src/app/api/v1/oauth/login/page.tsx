// 리다이렉트 페이지

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams ? searchParams.get("code") : null; // ✅ URL에서 code 가져오기

  // ✅ 백엔드에 로그인 요청
  const { mutate } = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch("https://picktory.net/api/v1/oauth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      try {
        const data = await response.json();
        return data;
      } catch {
        throw new Error("응답 처리 실패");
      }
    },
    onSuccess: (data) => {
      console.log("로그인 성공:", data);
      localStorage.setItem("token", data.token); // ✅ 토큰 저장
      router.push("/"); // ✅ 로그인 후 홈으로 리다이렉션
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
  });

  useEffect(() => {
    if (code) {
      console.log("code", code);
      mutate(code); // ✅ `code`가 있으면 백엔드로 전송
    }
  }, [code, mutate]);

  return <p>로그인 처리 중...</p>;
};

export default Page;
