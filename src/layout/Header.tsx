"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useEditBoxStore, useGiftStore } from "@/stores/gift-upload/useStore";
import {
  useBundleStore,
  useIsClickedUpdateFilledButton,
  useIsOpenDetailGiftBoxStore,
  useSelectedBagStore,
} from "@/stores/bundle/useStore";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/common/Icon";
import { GiftBox } from "@/types/bundle/types";
import { createBundle, updateBundle } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";
import useDynamicTitle from "@/hooks/useDynamicTitle";

import LogoIcon from "/public/icons/logo.svg";
import SettingIcon from "/public/icons/setting_large.svg";
import ArrowLeftIcon from "/public/icons/arrow_left_large.svg";
import CloseIcon from "/public/icons/close.svg";
import GoToHomeDrawer from "./GoToHomeDrawer";

// 정적 title 관리
const pageTitles: { [key: string]: string } = {
  "/bundle/detail": "내가 만든 보따리",
  "/bundle/list": "내가 만든 보따리",
  "/bundle/delivery": "선물 보따리 배달하기",
  "/bundle": "선물 보따리 만들기",
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
  const [showGoToHomeDrawer, setShowGoToHomeDrawer] = useState(false);

  const { setIsBoxEditing } = useEditBoxStore();

  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();

  const isAuthPage = ["/auth/login"].includes(pathname ?? "");
  const isHomePage = pathname === "/home";
  const isNotFoundPage = !Object.keys(pageTitles).some((key) =>
    pathname?.startsWith(key),
  );
  const isBundleDeliveryPage = pathname === "/bundle/delivery";
  const isGiftUploadPage = pathname === "/gift-upload";
  const isBundleAddPage = pathname === "/bundle/add";

  const { bundleName } = useBundleStore();

  const bgColor = isAuthPage ? "bg-pink-50" : "bg-white";

  useEffect(() => {
    setIsStepThree(step === "3");
  }, [searchParams, step]);

  useEffect(() => {
    setIsStepThree(false);
  }, [pathname]);

  const isBundleDetailStepTwo =
    pathname?.startsWith("/bundle/") && searchParams?.get("step") === "2";

  // 상대방이 받아보는 페이지 (bundle/[id])
  const isReceiveBundlePage =
    pathname?.startsWith("/bundle/") &&
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

  const bundleId = sessionStorage.getItem("bundleId");
  const { isClickedUpdateFilledButton } = useIsClickedUpdateFilledButton();

  useEffect(() => {
    const filledCount = giftBoxes.filter((box) => box && box.filled).length;
    setShowTempSave(filledCount >= 2);
  }, [giftBoxes]);

  const handleTempSave = async () => {
    try {
      const bundleId = sessionStorage.getItem("bundleId");

      if (!bundleId) {
        const res = await createBundle({
          bundleName,
          selectedBagIndex,
          giftBoxes,
        });

        if (res?.id) {
          sessionStorage.setItem("bundleId", res.id);
        }
      } else {
        const res = await updateBundle(giftBoxes);

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

  if (isBundleDetailStepTwo && isOpenDetailGiftBox) {
    return (
      <div className="sticky top-0 z-10 flex h-[56px] items-center justify-end bg-pink-50 px-4">
        <button onClick={() => setIsOpenDetailGiftBox(false)}>
          <Icon src={CloseIcon} alt="close" size="large" />
        </button>
      </div>
    );
  }

  if (isReceiveBundlePage) {
    return (
      <div
        className={`flex h-[56px] items-center justify-center ${step === "2" ? "bg-pink-50" : "bg-white"}`}
      >
        <Icon src={LogoIcon} alt="logo" />
      </div>
    );
  }

  // 메인 페이지: 로고 + 설정 아이콘
  if (isHomePage) {
    return (
      <div className="flex h-[56px] bg-white">
        <div className="flex w-full items-center justify-between px-4">
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
      <div className={`${bgColor} flex h-[56px] items-center justify-center`}>
        <Icon src={LogoIcon} alt="logo" />
      </div>
    );
  }

  const BackButton = () => {
    if (isStepThree && isBundleDeliveryPage) return null;

    const handleBack = () => {
      if (isGiftUploadPage) setIsBoxEditing(false);
      if (pathname === "/bundle/add") {
        if (bundleId) {
          if (!isClickedUpdateFilledButton) {
            router.push("/home");
          } else {
            router.back();
          }
        } else {
          const hasFilledBox = giftBoxes.some((box) => box?.filled);
          if (hasFilledBox) {
            setShowGoToHomeDrawer(true);
          } else {
            router.push("/home");
          }
        }
        return;
      }
      router.back();
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
    <h1 className="absolute left-1/2 w-[185px] -translate-x-1/2 overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg font-medium">
      {dynamicTitle}
    </h1>
  );

  const RightButton = () => {
    if (showTempSave && isBundleAddPage) {
      return (
        <Button
          variant="ghost"
          onClick={handleTempSave}
          className="flex justify-end text-[15px] text-gray-200"
        >
          임시 저장
        </Button>
      );
    }

    if (isBundleDeliveryPage && isStepThree) {
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
    <>
      <div
        className={`${isBundleAddPage ? "bg-pink-50" : "bg-white"} sticky top-0 z-10 flex h-[56px] items-center justify-between px-4`}
      >
        <BackButton />
        <Title />
        <RightButton />
      </div>
      <GoToHomeDrawer
        open={showGoToHomeDrawer}
        onClose={() => setShowGoToHomeDrawer(false)}
        onConfirm={() => {
          setShowGoToHomeDrawer(false);
          router.push("/home");
        }}
      />
    </>
  );
};

export default Header;
