import { GiftBox } from "@/types/giftbag/types";
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

interface GiftBoxDrawerProps {
  handleEmptyButton: () => void;
  box: GiftBox | null;
}

const GiftBoxDrawer = ({ handleEmptyButton, box }: GiftBoxDrawerProps) => {
  const { setIsBoxEditing } = useEditBoxStore();

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle />
        <DrawerDescription />
        <p className="text-base font-medium text-center">채워진 선물 정보</p>
      </DrawerHeader>
      <div className="flex flex-col bg-white p-6 gap-5">
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
            onClick={handleEmptyButton}
          >
            박스 비우기
          </Button>
          <Link href="/gift-upload">
            <Button className="h-[52px]" onClick={() => setIsBoxEditing(true)}>
              수정하기
            </Button>
          </Link>
        </div>
      </div>
    </DrawerContent>
  );
};

export default GiftBoxDrawer;
