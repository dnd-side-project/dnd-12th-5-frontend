import { Icon } from "../common/Icon";
import { DrawerClose, DrawerContent, DrawerHeader } from "../ui/drawer";

import CloseIcon from "/public/icons/close_black.svg";
import Good from "/public/icons/face-good.svg";
import OK from "/public/icons/face-ok.svg";
import Bad from "/public/icons/face-bad.svg";

const SurveyDrawer = () => {
  return (
    <DrawerContent>
      <DrawerHeader className="h-[48px]">
        <DrawerClose className="absolute right-4">
          <Icon src={CloseIcon} alt="CloseIcon" size="large" />
        </DrawerClose>
      </DrawerHeader>
      <p className="mb-[22px] text-center text-base font-medium">
        픽토리 서비스 사용 경험은 어떠셨나요?
      </p>
      <ul className="mb-[50px] flex justify-center gap-4">
        <li className="flex cursor-pointer flex-col items-center rounded-[12px] bg-gray-50 p-3">
          <Icon src={Good} alt="good" />
          <p>좋아요</p>
        </li>
        <li className="flex cursor-pointer flex-col items-center rounded-[12px] bg-gray-50 p-3">
          <Icon src={OK} alt="ok" />
          <p>보통이에요</p>
        </li>
        <li className="flex cursor-pointer flex-col items-center rounded-[12px] bg-gray-50 p-3">
          <Icon src={Bad} alt="bad" />
          <p>별로예요</p>
        </li>
      </ul>
    </DrawerContent>
  );
};

export default SurveyDrawer;
