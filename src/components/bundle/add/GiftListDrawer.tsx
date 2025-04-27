"use client";

import { Icon } from "@/components/common/Icon";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { GiftListDrawerProps } from "@/types/bundle/add/types";

import CloseIcon from "/public/icons/close.svg";

import GiftThumbnailList from "./GiftThumbnailList";

const GiftListDrawer = ({ open, onClose }: GiftListDrawerProps) => {
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
        <GiftThumbnailList />
      </DrawerContent>
    </Drawer>
  );
};

export default GiftListDrawer;
