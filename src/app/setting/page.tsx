"use client";

import Link from "next/link";

import ArrowIcon from "/public/icons/arrow_right_small.svg";

import { useRouter } from "next/navigation";

import { Icon } from "@/components/common/Icon";
import { toast } from "@/hooks/use-toast";
import { deleteToken } from "@/utils/utils";

const Page = () => {
  const router = useRouter();

  const handleLogOut = () => {
    deleteToken();
    toast({ title: "로그아웃 완료!" });
    router.push("/auth/login");
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-between border-b-[1px] border-[#f4f4f4] py-[18px] text-[15px]">
        <p>연결된 계정</p>
        <Link href={"/setting/account"}>
          <div className="flex cursor-pointer items-center justify-center">
            <p>카카오</p>
            <Icon src={ArrowIcon} alt="arrow" size="small" />
          </div>
        </Link>
      </div>
      <div className="border-b-[1px] border-[#f4f4f4] py-[18px] text-[15px]">
        <Link href={"/setting/notice"}>공지사항</Link>
      </div>
      <div className="flex items-center justify-between border-b-[1px] border-[#f4f4f4] py-[18px] text-[15px]">
        <p>버전 정보</p>
        <p className="text-gray-300">v1.0.0</p>
      </div>
      <div
        className="cursor-pointer border-b-[1px] border-[#f4f4f4] py-[18px] text-[15px] text-symantic-negative"
        onClick={handleLogOut}
      >
        <p>로그아웃</p>
      </div>
    </div>
  );
};

export default Page;
