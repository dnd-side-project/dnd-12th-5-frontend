import { useState } from "react";
import Link from "next/link";

import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import LinkButton from "../common/LinkButton";
import Card from "../common/Card";

import { Button } from "@/components/ui/button";
import { useEditBoxStore } from "@/stores/gift-upload/useStore";

import { Icon } from "../common/Icon";
import CloseIcon from "/public/icons/close.svg";
import { GiftBoxDrawerProps } from "@/types/components/types";

const GiftBoxDrawer = ({
  handleEmptyButton,
  box,
  index,
}: GiftBoxDrawerProps) => {
  const { setIsBoxEditing } = useEditBoxStore();
  const [isConfirmingEmpty, setIsConfirmingEmpty] = useState(false);

  const handleConfirmEmpty = () => {
    handleEmptyButton();
    setIsConfirmingEmpty(false);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <>
          <DrawerTitle className="relative text-base font-medium text-center mt-3">
            채워진 선물 정보
            <DrawerClose className="absolute top-0 right-4">
              <Icon src={CloseIcon} alt="close" size="large" />
            </DrawerClose>
          </DrawerTitle>
        </>
      </DrawerHeader>
      <div className="flex flex-col gap-[22px] px-[18px] pt-[26px] pb-5">
        {isConfirmingEmpty ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="mt-2 mb-5">
              <p className="text-center text-lg font-medium">
                박스를 정말 삭제하시겠습니까?
              </p>
              <p className="text-center text-sm text-gray-500">
                삭제된 박스는 되돌릴 수 없어요.
              </p>
            </div>
            <div className="flex gap-2 w-full">
              <Button
                className="h-[52px]"
                variant="secondary"
                onClick={() => setIsConfirmingEmpty(false)}
              >
                돌아가기
              </Button>
              <Button className="h-[52px]" onClick={handleConfirmEmpty}>
                박스 비우기
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div
                style={{ scrollbarWidth: "none" }}
                className="h-[88px] mb-2 flex gap-[11px] whitespace-nowrap w-full overflow-x-auto min-w-full"
              >
                {box?.imgUrls.map((url, index) => {
                  return (
                    <Card
                      img={url}
                      size="medium"
                      type="image"
                      noHoverStyle={true}
                      noActiveStyle={true}
                      noCursorPointerStyle={true}
                      key={index}
                    />
                  );
                })}
              </div>
              <LinkButton linkUrl={box?.purchase_url || ""} />
            </div>
            <div className="flex flex-col gap-[27px]">
              <div>
                <p className="text-xs text-gray-300 font-medium">선물 이름</p>
                <p className="text-[15px]">{box?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-300 font-medium">
                  선물을 고른 이유
                </p>
                {box?.reason ? (
                  <p className="text-[15px] font-medium">{box?.reason}</p>
                ) : (
                  <p className="text-[15px] text-gray-300 font-medium">
                    입력된 내용이 없습니다.
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[5px]">
              <Button
                className="h-[52px]"
                variant="secondary"
                onClick={() => setIsConfirmingEmpty(true)}
              >
                박스 비우기
              </Button>
              <Link href={`/gift-upload?index=${index ?? 0}`}>
                <Button
                  className="h-[52px]"
                  onClick={() => setIsBoxEditing(true)}
                >
                  수정하기
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </DrawerContent>
  );
};

export default GiftBoxDrawer;
