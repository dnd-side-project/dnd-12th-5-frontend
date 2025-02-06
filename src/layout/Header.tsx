"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import LogoIcon from "../../public/icons/logo.svg";
import SettingIcon from "../../public/icons/setting_large.svg";
import ArrowLeftIcon from "../../public/icons/arrow_left_large.svg";

// 정적 title 관리
// 임시 매핑
const pageTitles: { [key: string]: string } = {
  "/giftbag": "선물 보따리 만들기",
  "/gift-upload": "선물 박스 채우기",
  "/setting": "설정",
  "/my-bottari": "내가 만든 보따리",
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dynamicTitle, setDynamicTitle] = useState<string>(
    pageTitles[pathname ?? ""],
  );

  const isAuthPage = ["/onboarding", "/login", "/signup"].includes(
    pathname ?? "",
  );
  const isHomePage = pathname === "/";
  const isNotFoundPage = !Object.keys(pageTitles).some((key) =>
    pathname?.startsWith(key),
  );

  useEffect(() => {
    const title = searchParams?.get("title"); // 쿼리 파라미터에서 title 가져오기

    if (title) {
      setDynamicTitle(title); // title이 있으면 그걸로 설정
    } else {
      // pageTitles의 모든 경로에 대해 pathname이 포함되는지 확인
      const matchedTitle = Object.keys(pageTitles).find(
        (key) => pathname && pathname.includes(key),
      );
      if (matchedTitle) {
        setDynamicTitle(pageTitles[matchedTitle]);
      } else {
        setDynamicTitle("PICKTORY"); // 기본 제목 설정
      }
    }
  }, [pathname, searchParams]);

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

  // 온보딩 / 로그인 / 회원가입 페이지 / 404 페이지: 로고만
  if (isAuthPage || isNotFoundPage) {
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
