"use client";

import Link from "next/link";

import ArrowIcon from "/public/icons/arrow_right_small.svg";
import { deleteToken } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Icon } from "@/components/common/Icon";

const Page = () => {
  const router = useRouter();

  const handleLogOut = () => {
    deleteToken();
    toast({ title: "로그아웃 완료!" });
    router.push("/auth/login");
  };

  return (
    <div className="px-4">
      <div className="text-[15px] py-[18px] border-b-[1px] border-[#f4f4f4] flex justify-between items-center">
        <p>연결된 계정</p>
        <Link href={"/setting/account"}>
          <div className="flex justify-center items-center cursor-pointer">
            <p>카카오</p>
            <Icon src={ArrowIcon} alt="arrow" size="small" />
          </div>
        </Link>
      </div>
      <div className="text-[15px] py-[18px]  border-b-[1px] border-[#f4f4f4]">
        <Link href={"/setting/notice"}>공지사항</Link>
      </div>
      <div className="text-[15px] py-[18px] border-b-[1px] border-[#f4f4f4] flex justify-between items-center">
        <p>버전 정보</p>
        <p className="text-gray-300">v1.0.0</p>
      </div>
      <div
        className="text-[15px] py-[18px] border-b-[1px] border-[#f4f4f4] text-symantic-negative cursor-pointer"
        onClick={handleLogOut}
      >
        <p>로그아웃</p>
      </div>
    </div>
  );
};

export default Page;
