import Link from "next/link";

import Card from "../common/Card";
import { Icon } from "../common/Icon";
import LinkButton from "../common/LinkButton";
import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "@/components/ui/button";
import { useEditBoxStore } from "@/stores/gift-upload/useStore";

import CloseIcon from "/public/icons/close.svg";

import { BundleDrawerProps } from "@/types/components/types";

const BundleDrawer = ({
  box,
  index,
  setClickedDeleteBoxButton,
}: BundleDrawerProps) => {
  const { setIsBoxEditing } = useEditBoxStore();

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="relative mt-3 text-center text-base font-medium">
          채워진 선물 정보
          <DrawerClose className="absolute right-4 top-0">
            <Icon src={CloseIcon} alt="close" size="large" />
          </DrawerClose>
        </DrawerTitle>
      </DrawerHeader>
      <div className="flex flex-col gap-[22px] px-[18px] pb-5 pt-[26px]">
        <div>
          <div
            style={{ scrollbarWidth: "none" }}
            className="mb-2 flex h-[88px] w-full min-w-full gap-[11px] overflow-x-auto whitespace-nowrap"
          >
            {box?.imgUrls.map((url, index) => {
              return (
                <Card
                  img={url}
                  size="medium"
                  type="gift"
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
            <p className="text-xs font-medium text-gray-300">선물 이름</p>
            <p className="text-[15px]">{box?.name}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-300">
              선물을 고른 이유
            </p>
            {box?.reason ? (
              <p className="text-[15px] font-medium">{box?.reason}</p>
            ) : (
              <p className="text-[15px] font-medium text-gray-300">
                입력된 내용이 없습니다.
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[5px]">
          <Button
            className="h-[52px]"
            variant="secondary"
            onClick={() => setClickedDeleteBoxButton(true)}
          >
            박스 비우기
          </Button>
          <Link href={`/gift-upload?index=${index ?? 0}`}>
            <Button className="h-[52px]" onClick={() => setIsBoxEditing(true)}>
              수정하기
            </Button>
          </Link>
        </div>
      </div>
    </DrawerContent>
  );
};

export default BundleDrawer;
