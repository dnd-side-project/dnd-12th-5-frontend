"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import LogoIcon from "../public/icons/logo.svg";
import SettingIcon from "../public/icons/setting_large.svg";
import ArrowLeftIcon from "../public/icons/arrow_left_large.svg";

// 정적 title 관리
// 임시 매핑
const pageTitles: { [key: string]: string } = {
  "/make-gift": "선물 보따리 만들기",
  "/fill-gift": "선물 박스 채우기",
  "/send-gift": "선물 보따리 배달하기",
  "/setting": "설정",
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [dynamicTitle, setDynamicTitle] = useState<string>(
    pageTitles[pathname ?? ""],
  );

  const [title, setTitle] = useState<string>("");

  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null,
  );

  const isAuthPage = ["/onboarding", "/login", "/signup"].includes(
    pathname ?? "",
  );

  const isHomePage = pathname === "/";

  useEffect(() => {
    // 클라이언트에서만 searchParams를 사용할 수 있도록 설정
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
    }
  }, []);

  useEffect(() => {
    if (searchParams) {
      setTitle(searchParams.get("title") ?? "");
    }
  }, [searchParams]);

  useEffect(() => {
    if (title) {
      setDynamicTitle(String(title));
    }
  }, [title]);

  // 메인 페이지: 로고 + 설정 아이콘
  if (isHomePage) {
    return (
      <div className="h-[56px] flex bg-pink-100">
        <div className="flex items-center justify-between px-4 w-full">
          <button onClick={() => router.push("/")}>
            <Image src={LogoIcon} alt="logo" />
          </button>
          <button onClick={() => router.push("/setting")}>
            <Image src={SettingIcon} alt="setting" />
          </button>
        </div>
      </div>
    );
  }

  // 온보딩 / 로그인 / 회원가입 페이지: 로고만
  if (isAuthPage) {
    return (
      <div className="h-[56px] flex bg-pink-100 items-center justify-center">
        <Image src={LogoIcon} alt="logo" />
      </div>
    );
  }

  // 나머지 페이지: 뒤로가기 버튼 + 중앙 페이지 타이틀
  return (
    <div className="h-[56px] flex bg-pink-100 items-center px-4 relative">
      <button onClick={() => router.back()}>
        <Image src={ArrowLeftIcon} alt="back" />
      </button>
      <h1 className="text-lg font-bold absolute left-1/2 transform -translate-x-1/2">
        {dynamicTitle}
      </h1>
    </div>
  );
};

export default Header;
