"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useEditBoxStore, useGiftStore } from "@/stores/gift-upload/useStore";
import {
  useGiftBagStore,
  useIsClickedUpdateFilledButton,
  useIsOpenDetailGiftBoxStore,
  useSelectedBagStore,
} from "@/stores/giftbag/useStore";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { GiftBox } from "@/types/giftbag/types";
import { createGiftBag, updateGiftBag } from "@/api/giftbag/api";
import { toast } from "@/hooks/use-toast";
import useDynamicTitle from "@/hooks/useDynamicTitle";

import LogoIcon from "/public/icons/logo.svg";
import SettingIcon from "/public/icons/setting_large.svg";
import ArrowLeftIcon from "/public/icons/arrow_left_large.svg";
import CloseIcon from "/public/icons/close.svg";

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

  const dynamicTitle = useDynamicTitle(); // 타이틀 동적 업데이트

  const [isStepThree, setIsStepThree] = useState(false);
  const { setIsBoxEditing } = useEditBoxStore();

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

  const bgColor = isAuthPage ? "bg-pink-50" : "bg-white";

  useEffect(() => {
    setIsStepThree(step === "3");
  }, [searchParams, step]);

  useEffect(() => {
    setIsStepThree(false);
  }, [pathname]);

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

  const giftBagId = sessionStorage.getItem("giftBagId");
  const { isClickedUpdateFilledButton } = useIsClickedUpdateFilledButton();

  useEffect(() => {
    const filledCount = giftBoxes.filter((box) => box && box.filled).length;
    setShowTempSave(filledCount >= 2);
  }, [giftBoxes]);

  const handleTempSave = async () => {
    try {
      const giftBagId = sessionStorage.getItem("giftBagId");

      if (!giftBagId) {
        const res = await createGiftBag({
          giftBagName,
          selectedBagIndex,
          giftBoxes,
        });

        if (res?.id) {
          sessionStorage.setItem("giftBagId", res.id);
        }
      } else {
        const res = await updateGiftBag(giftBoxes);

        if (res?.result?.gifts) {
          res.result.gifts.forEach((gift: GiftBox, index: number) => {
            useGiftStore.getState().updateGiftBox(index, { id: gift.id });
          });
        }
      }

      toast({
        title: "임시저장 성공",
        description: "보따리가 임시저장되었습니다.",
      });
    } catch (error) {
      toast({
        title: "임시저장 실패",
        description: `보따리 임시저장에 실패했습니다. ${error}`,
      });
    }
  };

  if (isGiftbagDetailStepTwo && isOpenDetailGiftBox) {
    return (
      <div className="h-[56px] bg-pink-50 flex items-center justify-end px-4 sticky top-0 z-10">
        <button onClick={() => setIsOpenDetailGiftBox(false)}>
          <Icon src={CloseIcon} alt="close" size="large" />
        </button>
      </div>
    );
  }

  if (isReceiveGiftbagPage) {
    return (
      <div
        className={`h-[56px] flex items-center justify-center ${step === "2" ? "bg-pink-50" : "bg-white"}`}
      >
        <Icon src={LogoIcon} alt="logo" />
      </div>
    );
  }

  // 메인 페이지: 로고 + 설정 아이콘
  if (isHomePage) {
    return (
      <div className="h-[56px] flex bg-white">
        <div className="flex items-center justify-between px-4 w-full">
          <button onClick={() => router.push("/")}>
            <Icon src={LogoIcon} alt="logo" />
          </button>
          <button onClick={() => router.push("/setting")}>
            <Icon src={SettingIcon} alt="setting" size="large" />
          </button>
        </div>
      </div>
    );
  }

  // auth 페이지, 404 페이지: 로고만 중앙 정렬
  if (isAuthPage || isNotFoundPage) {
    return (
      <div className={`${bgColor} h-[56px] flex items-center justify-center`}>
        <Icon src={LogoIcon} alt="logo" />
      </div>
    );
  }

  const BackButton = () => {
    if (isStepThree && isGiftbagDeliveryPage) return null;

    const handleBack = () => {
      if (isGiftUploadPage) setIsBoxEditing(false);
      if (
        giftBagId &&
        pathname === "/giftbag/add" &&
        !isClickedUpdateFilledButton
      ) {
        router.push("/home");
      } else {
        router.back();
      }
    };

    return (
      <Button
        onClick={handleBack}
        variant="ghost"
        className="flex justify-start"
      >
        <Icon src={ArrowLeftIcon} alt="back" size="large" />
      </Button>
    );
  };

  const Title = () => (
    <h1 className="text-center text-lg font-medium w-[185px] overflow-hidden whitespace-nowrap text-ellipsis absolute left-1/2 -translate-x-1/2">
      {dynamicTitle}
    </h1>
  );

  const RightButton = () => {
    if (showTempSave && isGiftbagAddPage) {
      return (
        <Button
          variant="ghost"
          onClick={handleTempSave}
          className="text-[15px] text-gray-200 flex justify-end"
        >
          임시 저장
        </Button>
      );
    }

    if (isGiftbagDeliveryPage && isStepThree) {
      return (
        <Button
          onClick={() => router.push("/home")}
          variant="ghost"
          className="flex justify-end"
        >
          <Icon src={CloseIcon} alt="close" size="large" />
        </Button>
      );
    }

    return null;
  };

  return (
    <div
      className={`${isGiftbagAddPage ? "bg-pink-50" : "bg-white"} h-[56px] flex justify-between items-center px-4 sticky top-0 z-10`}
    >
      <BackButton />
      <Title />
      <RightButton />
    </div>
  );
};

export default Header;
