import KakaoLogoIcon from "/public/icons/kakao_circle_logo.svg";
import { Icon } from "@/components/common/Icon";

const page = () => {
  return (
    <div className="mt-[14px]">
      <div className="flex items-center gap-[10px] border-b-[1px] border-[#f4f4f4] px-4 py-[18px]">
        <Icon src={KakaoLogoIcon} alt="kakao" />
        <p className="text-[15px] font-medium">카카오</p>
      </div>
      <p className="mt-[24px] px-4 text-[15px] text-symantic-negative">
        회원 탈퇴
      </p>
    </div>
  );
};

export default page;
