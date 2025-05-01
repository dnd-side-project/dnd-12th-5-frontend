import { Icon } from "../../common/Icon";
import { Button } from "../../ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "../../ui/drawer";

import CloseIcon from "/public/icons/close.svg";

import Card from "@/components/common/Card";
import { DeleteBundleDrawerProps } from "@/types/bundle/add/types";

const DeleteBundleDrawer = ({
  box,
  handleDeleteButton,
  setClickedDeleteBoxButton,
}: DeleteBundleDrawerProps) => {
  return (
    <DrawerContent>
      <DrawerHeader>
        <>
          <DrawerTitle className="relative text-center text-base font-medium">
            <p className="text-center text-base font-medium">
              채워진 선물 정보
            </p>
            <DrawerClose className="absolute right-4 top-0">
              <Icon src={CloseIcon} alt="close" size="large" />
            </DrawerClose>
          </DrawerTitle>
        </>
      </DrawerHeader>
      <div className="flex flex-col items-center justify-center px-[18px] pb-5">
        <div className="my-[26px] flex flex-col items-center gap-[7px]">
          <Card img={box?.imgUrls[0] as string} size="small" type="gift" />
          <p>{box?.name}</p>
        </div>
        <div className="mb-5 flex flex-col text-center">
          <p className="text-[15px]">선택한 박스를 정말 삭제할까요?</p>
          <p className="text-sm text-gray-500">
            삭제된 박스는 되돌릴 수 없어요.
          </p>
        </div>
        <div className="flex w-full gap-2">
          <Button
            className="h-[52px]"
            variant="secondary"
            onClick={() => setClickedDeleteBoxButton(false)}
          >
            돌아가기
          </Button>
          <Button className="h-[52px]" onClick={handleDeleteButton}>
            박스 비우기
          </Button>
        </div>
      </div>
    </DrawerContent>
  );
};

export default DeleteBundleDrawer;
