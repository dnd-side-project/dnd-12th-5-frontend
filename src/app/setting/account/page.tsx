"use client";

import { toast } from "@/hooks/use-toast";
import KakaoLogoIcon from "/public/icons/kakao_circle_logo.svg";

import { Icon } from "@/components/common/Icon";

const page = () => {
  return (
    <div className="mt-[14px]">
      <div className="flex items-center gap-[10px] border-b-[1px] border-[#f4f4f4] px-4 py-[18px]">
        <Icon src={KakaoLogoIcon} alt="kakao" />
        <p className="text-[15px] font-medium">카카오</p>
      </div>
      <p
        className="mt-6 cursor-pointer px-4 text-[15px] text-symantic-negative"
        onClick={() =>
          toast({
            title: "해당 기능은 준비 중입니다.",
            description: "조금만 기다려 주세요!",
          })
        }
      >
        회원 탈퇴
      </p>
    </div>
  );
};

export default page;
