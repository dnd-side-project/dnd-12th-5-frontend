"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";

import { useEditBoxStore, useGiftStore } from "@/stores/gift-upload/useStore";
import {
  useGiftBagStore,
  useGiftNameStore,
  useIsOpenDetailGiftBoxStore,
  useSelectedBagStore,
} from "@/stores/giftbag/useStore";

import { Button } from "@/components/ui/button";

import LogoIcon from "../../public/icons/logo.svg";
import SettingIcon from "../../public/icons/setting_large.svg";
import ArrowLeftIcon from "../../public/icons/arrow_left_large.svg";
import { createGiftBag, updateGiftBag } from "@/api/giftbag/api";
import { toast } from "@/hooks/use-toast";
import { GiftBox } from "@/types/giftbag/types";

// 정적 title 관리
const pageTitles: { [key: string]: string } = {
  "/giftbag/detail": "내가 만든 보따리",
  "/giftbag/list": "내가 만든 보따리",
  "/giftbag/delivery": "선물 보따리 배달하기",
  "/giftbag": "선물 보따리 만들기",
  "/gift-upload": "선물 박스 채우기",
  "/setting/account": "연결된 계정",
  "/setting/notice": "공지사항",
  "/setting": "설정",
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams?.get("step");
  const { giftId } = useParams() as { giftId?: string };

  const [dynamicTitle, setDynamicTitle] = useState<string>(
    pageTitles[pathname ?? ""],
  );
  const [isStepThree, setIsStepThree] = useState(false);
  const { setIsBoxEditing } = useEditBoxStore();
  const [showSettingIcon, setShowSettingIcon] = useState(false);
  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();

  const isAuthPage = ["/auth/login"].includes(pathname ?? "");
  const isHomePage = pathname === "/home";
  const isNotFoundPage = !Object.keys(pageTitles).some((key) =>
    pathname?.startsWith(key),
  );
  const isGiftbagDeliveryPage = pathname === "/giftbag/delivery";
  const isGiftUploadPage = pathname === "/gift-upload";
  const isGiftbagAddPage = pathname === "/giftbag/add";

  const { giftBagName } = useGiftBagStore();
  const { giftName } = useGiftNameStore();

  const bgColor = isAuthPage ? "bg-pink-50" : "bg-white";

  useEffect(() => {
    setIsStepThree(step === "3");
  }, [searchParams, step]);

  useEffect(() => {
    setIsStepThree(false);
  }, [pathname]);

  useEffect(() => {
    if (giftName && giftId) {
      return setDynamicTitle(giftName);
    }

    if (giftBagName && pathname === "/giftbag/add") {
      setDynamicTitle(giftBagName);
    } else {
      const title = searchParams?.get("title");

      if (title) {
        setDynamicTitle(title);
      }
      // 동적 경로 처리
      if (pathname?.match(/^\/giftbag\/list\/[^/]+\/answer$/)) {
        setDynamicTitle("보따리 결과");
      } else {
        // 정적 매핑 확인
        const matchedTitle = Object.keys(pageTitles).find(
          (key) => pathname && pathname.includes(key),
        );

        if (matchedTitle) {
          setDynamicTitle(pageTitles[matchedTitle]);
        } else {
          setDynamicTitle("PICKTORY"); // 기본 제목 설정
        }
      }
    }
  }, [giftBagName, giftId, giftName, pathname, searchParams]);

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

  // 상대방이 받아보는 페이지 (giftbag/[id])
  const isReceiveGiftbagPage =
    pathname?.startsWith("/giftbag/") &&
    !pathname.includes("list") &&
    !pathname.includes("detail") &&
    !pathname.includes("add") &&
    !pathname.includes("delivery") &&
    !pathname.includes("name") &&
    !pathname.includes("select");

  {
    /** 보따리 임시저장 관련 코드 */
  }
  const { giftBoxes } = useGiftStore();
  const { selectedBagIndex } = useSelectedBagStore();
  const [showTempSave, setShowTempSave] = useState(false);

  useEffect(() => {
    const filledCount = giftBoxes.filter((box) => box.filled).length;
    setShowTempSave(filledCount >= 2);
  }, [giftBoxes]);

  const [giftBagId, setGiftBagId] = useState<string | null>(
    () => sessionStorage.getItem("giftBagId") || null,
  );

  useEffect(() => {
    if (giftBagId) {
      sessionStorage.setItem("giftBagId", giftBagId);
    }
  }, [giftBagId]);

  const handleTempSave = async () => {
    if (giftBagId) {
      try {
        const res = await updateGiftBag(giftBoxes);

        if (res?.gifts?.length) {
          res.gifts.forEach((gift: GiftBox, index: number) => {
            useGiftStore.getState().updateGiftBox(index, { id: gift.id });
          });
        }

        toast({
          title: "임시저장 성공",
          description: "보따리가 임시저장되었습니다.",
          style: {
            position: "fixed",
            bottom: "16px",
            right: "12px",
            width: "400px",
          },
        });
      } catch (error) {
        toast({
          title: "임시저장 실패",
          description: `보따리 임시저장에 실패했습니다. ${error}`,
          style: {
            position: "fixed",
            bottom: "16px",
            right: "12px",
            width: "400px",
          },
        });
      }
    } else {
      try {
        const res = await createGiftBag({
          giftBagName,
          selectedBagIndex,
          giftBoxes,
        });

        if (res?.id) {
          setGiftBagId(res.id);
        }

        if (res?.gifts?.length) {
          res.gifts.forEach((gift: GiftBox, index: number) => {
            useGiftStore.getState().updateGiftBox(index, { id: gift.id });
          });
        }

        toast({
          title: "임시저장 성공",
          description: "보따리가 임시저장되었습니다.",
          style: {
            position: "fixed",
            bottom: "16px",
            right: "12px",
            width: "400px",
          },
        });
      } catch (error) {
        toast({
          title: "임시저장 실패",
          description: `보따리 임시저장에 실패했습니다. ${error}`,
          style: {
            position: "fixed",
            bottom: "16px",
            right: "12px",
            width: "400px",
          },
        });
      }
    }
  };

  if (isGiftbagDetailStepTwo && isOpenDetailGiftBox) {
    return (
      <div className="h-[56px] bg-pink-50 flex items-center justify-end px-4 sticky top-0 z-10">
        <button onClick={() => setIsOpenDetailGiftBox(false)}>
          <Image src="/icons/close.svg" alt="close" width={24} height={24} />
        </button>
      </div>
    );
  }

  if (isReceiveGiftbagPage) {
    return (
      <div
        className={`h-[56px] flex items-center justify-center ${step === "2" ? "bg-pink-50" : "bg-white"}`}
      >
        <Image src={LogoIcon} alt="logo" />
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

  // 온보딩 / 로그인 페이지 / 404 페이지: 로고만 중앙 정렬
  if (isAuthPage || isNotFoundPage) {
    return (
      <div className={`${bgColor} h-[56px] flex items-center justify-center`}>
        <Image src={LogoIcon} alt="logo" />
      </div>
    );
  }

  // 나머지 페이지: 뒤로가기 버튼 + 페이지 타이틀
  return (
    <div
      className={`${isGiftbagAddPage ? "bg-pink-50" : "bg-white"} h-[56px] flex justify-between items-center px-4 sticky top-0 z-10`}
    >
      {/* step이 3일 때만 뒤로가기 버튼 숨기기 */}
      {!(isStepThree && isGiftbagDeliveryPage) && (
        <Button
          onClick={() => {
            if (isGiftUploadPage) {
              setIsBoxEditing(false);
            }
            router.back();
          }}
          variant="ghost"
          className="flex justify-start"
        >
          <Image src={ArrowLeftIcon} alt="back" />
        </Button>
      )}
      <h1 className="text-center text-lg font-medium w-[185px] overflow-hidden whitespace-nowrap text-ellipsis absolute left-1/2 -translate-x-1/2">
        {dynamicTitle}
      </h1>
      {showTempSave && isGiftbagAddPage && (
        <Button
          variant="ghost"
          onClick={handleTempSave}
          className="text-[15px] text-gray-200 flex justify-end"
        >
          임시저장
        </Button>
      )}
    </div>
  );
};

export default Header;
