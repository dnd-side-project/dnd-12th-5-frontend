import LogoKakaoIcon from "/public/icons/logo_kakao.svg";
import { Icon } from "./Icon";

const KakaoLoginButton = ({ link }: { link: string }) => {
  return (
    <a
      href={link}
      className="bg-[#FEE500] flex py-[17px] justify-center rounded-sm px-4 hover:opacity-90"
    >
      <Icon src={LogoKakaoIcon} alt="logo" className="absolute left-[34px]" />
      <p className="text-sm font-medium">카카오톡으로 시작하기</p>
    </a>
  );
};

export default KakaoLoginButton;
