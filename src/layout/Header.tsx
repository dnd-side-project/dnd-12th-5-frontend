"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import LogoIcon from "../../public/icons/logo.svg";
import SettingIcon from "../../public/icons/setting_large.svg";
import ArrowLeftIcon from "../../public/icons/arrow_left_large.svg";
import { useEditBoxStore } from "@/stores/gift-upload/useStore";
import { useIsOpenDetailGiftBoxStore } from "@/stores/giftbag/useStore";

// 정적 title 관리
// 임시 매핑
const pageTitles: { [key: string]: string } = {
  "/giftbag/detail": "내가 만든 보따리",
  "/giftbag/list": "내가 만든 보따리",
  "/giftbag/delivery": "선물 보따리 배달하기",
  "/giftbag": "선물 보따리 만들기",
  "/gift-upload": "선물 박스 채우기",
  "/setting/account": "연결된 계정",
  "/setting": "설정",
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dynamicTitle, setDynamicTitle] = useState<string>(
    pageTitles[pathname ?? ""],
  );
  const [isStepThree, setIsStepThree] = useState(false);
  const { setIsBoxEditing } = useEditBoxStore();
  const [showSettingIcon, setShowSettingIcon] = useState(false);
  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();

  const isAuthPage = ["/onboarding", "/login", "/signup"].includes(
    pathname ?? "",
  );
  const isHomePage = pathname === "/";
  const isNotFoundPage = !Object.keys(pageTitles).some((key) =>
    pathname?.startsWith(key),
  );
  const isGiftbagDeliveryPage = pathname === "/giftbag/delivery";
  const isGiftUploadPage = pathname === "/gift-upload";

  useEffect(() => {
    const step = searchParams?.get("step");
    setIsStepThree(step === "3");
  }, [searchParams]);

  // pathname 변경 시 isStepThree 상태 초기화
  useEffect(() => {
    setIsStepThree(false);
  }, [pathname]);

  useEffect(() => {
    const title = searchParams?.get("title");

    if (title) {
      setDynamicTitle(title);
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

  // 로컬 스토리지에서 토큰 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      setShowSettingIcon(true);
    } else {
      setShowSettingIcon(false);
    }
  }, []);

  const isGiftbagDetailStepTwo =
    pathname?.startsWith("/giftbag/") && searchParams?.get("step") === "2";

  if (isGiftbagDetailStepTwo && isOpenDetailGiftBox) {
    return (
      <div className="h-[56px] bg-pink-50 flex items-center justify-end px-4 sticky top-0 z-10">
        <button onClick={() => setIsOpenDetailGiftBox(false)}>
          <Image src="/icons/close.svg" alt="close" width={24} height={24} />
        </button>
      </div>
    );
  }

  // 메인 페이지: 로고 + 설정 아이콘
  if (isHomePage) {
    return (
      <div className="h-[56px] flex bg-white">
        <div className="flex items-center justify-between px-4 w-full">
          <button onClick={() => router.push("/")}>
            <Image src={LogoIcon} alt="logo" />
          </button>
          {showSettingIcon && (
            <button onClick={() => router.push("/setting")}>
              <Image src={SettingIcon} alt="setting" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // 온보딩 / 로그인 / 회원가입 페이지 / 404 페이지: 로고만
  if (isAuthPage || isNotFoundPage) {
    return (
      <div className="bg-white h-[56px] flex items-center justify-center">
        <Image src={LogoIcon} alt="logo" />
      </div>
    );
  }

  // 나머지 페이지: 뒤로가기 버튼 + 중앙 페이지 타이틀
  return (
    <div className="bg-white h-[56px] flex items-center px-4 sticky top-0 z-10">
      {/* step이 3일 때만 뒤로가기 버튼 숨기기 */}
      {!(isStepThree && isGiftbagDeliveryPage) && (
        <button
          onClick={() => {
            if (isGiftUploadPage) {
              setIsBoxEditing(false);
            }
            router.back();
          }}
        >
          <Image src={ArrowLeftIcon} alt="back" />
        </button>
      )}
      <h1 className="text-center text-lg font-bold absolute left-1/2 transform -translate-x-1/2 w-[185px] overflow-hidden whitespace-nowrap text-ellipsis">
        {dynamicTitle}
      </h1>
    </div>
  );
};

export default Header;
