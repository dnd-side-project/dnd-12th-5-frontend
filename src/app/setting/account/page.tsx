"use client";

import { useState } from "react";

import KakaoLogoIcon from "/public/icons/kakao_circle_logo.svg";

import { Icon } from "@/components/common/Icon";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useDeleteUserMutation } from "@/queries/useDeleteUserMutation";

import CloseIcon from "/public/icons/close.svg";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useDeleteUserMutation();

  return (
    <div className="mt-[14px]">
      <div className="flex items-center gap-[10px] border-b border-[#f4f4f4] px-4 py-[18px]">
        <Icon src={KakaoLogoIcon} alt="kakao" />
        <p className="text-[15px] font-medium">카카오</p>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button className="mt-6 px-4 text-[15px] text-symantic-negative">
            회원 탈퇴
          </button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader className="relative flex justify-center py-3">
            <DrawerTitle>
              회원 탈퇴
              <DrawerClose className="absolute right-4 top-3">
                <Icon src={CloseIcon} alt="close" size="large" />
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <p className="mb-[22px] mt-[26px] text-center text-sm text-gray-500">
            지금까지 만든 보따리가 모두 사라져요. <br />
            그래도 탈퇴하시겠어요?
          </p>
          <DrawerFooter className="flex gap-2">
            <div className="flex w-full gap-[5px] px-[18px]">
              <DrawerClose asChild>
                <Button size="lg" variant={"secondary"}>
                  돌아가기
                </Button>
              </DrawerClose>

              <Button size="lg" onClick={() => mutate()}>
                탈퇴하기
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Page;
