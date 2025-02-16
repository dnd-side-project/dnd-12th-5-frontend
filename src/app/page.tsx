"use client"; // 클라이언트 컴포넌트로 선언

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Loading from "@/components/common/Loading";

export default function Home() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/login");
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return <>{isLoggedIn ? router.push("/home") : router.push("/auth/login")}</>;
}
