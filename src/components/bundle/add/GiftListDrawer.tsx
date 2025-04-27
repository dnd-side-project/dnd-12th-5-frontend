"use client";

import { Icon } from "@/components/common/Icon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { GiftListDrawerProps } from "@/types/bundle/add/types";

import CloseIcon from "/public/icons/close.svg";

const GiftListDrawer = ({ open, onClose }: GiftListDrawerProps) => {
  const { giftBoxes } = useGiftStore();

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="relative mt-3 text-center text-base font-medium">
            채워진 선물 정보
            <DrawerClose className="absolute right-4 top-0">
              <Icon src={CloseIcon} alt="close" size="large" />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        {giftBoxes.map((_, index) => (
          <div key={index}>
            <p>name</p>
          </div>
        ))}
      </DrawerContent>
    </Drawer>
  );
};

export default GiftListDrawer;
