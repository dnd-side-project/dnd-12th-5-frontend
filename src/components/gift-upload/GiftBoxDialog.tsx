import { GiftBox } from "@/types/giftbag/types";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import LinkButton from "../common/LinkButton";

interface GiftBoxDialogProps {
  isOpen: boolean;
  onClose: () => void;
  box: GiftBox;
}

const GiftBoxDialog = ({ isOpen, onClose, box }: GiftBoxDialogProps) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent className="w-[375px]">
        <DrawerHeader>
          <p className="text-base font-medium text-center">채워진 선물 정보</p>
        </DrawerHeader>
        <div className="flex flex-col bg-white p-6 gap-5">
          <div>
            <div className="h-[88px] bg-pink-100 mb-4">이미지</div>
            <LinkButton linkUrl={box.purchase_url || ""} />
          </div>
          <div className="flex flex-col gap-[27px]">
            <div>
              <p className="text-xs text-gray-300">선물 이름</p>
              <p className="text-[15px]">{box.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-300">선물을 고른 이유</p>
              <p className="text-[15px]">{box.reason}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-[167px] h-[52px]"
              variant="secondary"
              onClick={onClose}
            >
              박스 비우기
            </Button>
            <Button
              className="w-[167px] h-[52px]"
              onClick={() => alert("수정하기")}
            >
              수정하기
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GiftBoxDialog;
