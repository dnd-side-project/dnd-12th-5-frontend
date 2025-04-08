import LogoKakaoIcon from "/public/icons/logo_kakao.svg";
import { Icon } from "./Icon";

const KakaoLoginButton = ({ link }: { link: string }) => {
  return (
    <a
      href={link}
      className="flex justify-center rounded-sm bg-[#FEE500] px-4 py-[17px]"
    >
      <Icon src={LogoKakaoIcon} alt="logo" className="absolute left-[34px]" />
      <p className="text-sm font-medium">카카오톡으로 시작하기</p>
    </a>
  );
};

export default KakaoLoginButton;
