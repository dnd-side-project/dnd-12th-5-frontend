import Link from "next/link";
import Image from "next/image";

import ArrowIcon from "/public/icons/arrow_right_small.svg";

const page = () => {
  return (
    <div className="px-4">
      <div className="text-[15px] py-[18px] border-b-[1px] border-[#f4f4f4] flex justify-between items-center">
        <Link href={"/setting/account"}>연결된 계정</Link>
        <div className="flex justify-center items-center">
          <p>카카오</p>
          <Image src={ArrowIcon} alt="arrow" width={14} height={14} />
        </div>
      </div>
      <div className="text-[15px] py-[18px]  border-b-[1px] border-[#f4f4f4]">
        <Link href={"/setting/notice"}>공지사항</Link>
      </div>
      <div className="text-[15px] py-[18px] border-b-[1px] border-[#f4f4f4]">
        <Link href={"/setting/version"}>버전 정보</Link>
      </div>
      <div className="text-[15px] py-[18px] border-b-[1px] border-[#f4f4f4] text-symantic-negative">
        <Link href={"/"}>로그아웃</Link>
      </div>
    </div>
  );
};

export default page;
