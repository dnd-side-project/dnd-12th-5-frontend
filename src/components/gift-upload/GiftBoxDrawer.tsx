import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import LinkButton from "../common/LinkButton";
import Link from "next/link";
import { useEditBoxStore } from "@/stores/gift-upload/useStore";
import { GiftBox } from "@/types/giftbag/types";

interface GiftBoxDrawerProps {
  handleEmptyButton: () => void;
  box: GiftBox | null;
}

const GiftBoxDrawer = ({ handleEmptyButton, box }: GiftBoxDrawerProps) => {
  const { setIsBoxEditing } = useEditBoxStore();
  const [isConfirmingEmpty, setIsConfirmingEmpty] = useState(false);

  const handleConfirmEmpty = () => {
    handleEmptyButton();
    setIsConfirmingEmpty(false);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle />
        <DrawerDescription />
        <p className="text-base font-medium text-center">채워진 선물 정보</p>
      </DrawerHeader>
      <div className="flex flex-col gap-5 p-6">
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
                onClick={handleConfirmEmpty}
              >
                박스 비우기
              </Button>
              <Button
                className="h-[52px]"
                onClick={() => setIsConfirmingEmpty(false)}
              >
                돌아가기
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="h-[88px] bg-pink-100 mb-4">이미지</div>
              <LinkButton linkUrl={box?.purchase_url || ""} />
            </div>
            <div className="flex flex-col gap-[27px]">
              <div>
                <p className="text-xs text-gray-300">선물 이름</p>
                <p className="text-[15px]">{box?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-300">선물을 고른 이유</p>
                {box?.reason ? (
                  <p className="text-[15px] font-medium">{box?.reason}</p>
                ) : (
                  <p className="text-[15px] text-gray-300 font-medium">
                    입력된 내용이 없습니다.
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="h-[52px]"
                variant="secondary"
                onClick={() => setIsConfirmingEmpty(true)}
              >
                박스 비우기
              </Button>
              <Link href="/gift-upload">
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
