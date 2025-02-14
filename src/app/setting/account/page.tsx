import Image from "next/image";

import KakaoLogoIcon from "/public/icons/kakao_circle_logo.svg";

const page = () => {
  return (
    <div className="mt-[14px]">
      <div className="px-4 py-[18px] border-b-[1px] border-[#f4f4f4] flex  items-center gap-[10px]">
        <Image src={KakaoLogoIcon} alt="kakao" />
        <p className="text-[15px] font-medium">카카오</p>
      </div>
      <p className="text-[15px] mt-[24px] px-4 text-symantic-negative">
        회원 탈퇴
      </p>
    </div>
  );
};

export default page;
