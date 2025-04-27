"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { GiftListDrawerProps } from "@/types/bundle/add/types";

const GiftListDrawer = ({ open, onClose, giftBoxes }: GiftListDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>선물박스 목록</DrawerTitle>
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
