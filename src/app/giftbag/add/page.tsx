"use client";

import { useGiftStore } from "@/stores/gift-upload/useStore";
import Chip from "@/components/giftbag/Chip";
import GiftList from "@/components/giftbag/GiftList";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftCount = giftBoxes.filter((gift) => gift.filled).length;

  return (
    <div className="h-full bg-pink-50 flex flex-col items-center p-4 gap-10">
      <div className="flex flex-col gap-7 w-[300px] items-center">
        <Chip text={`채워진 선물박스 ${filledGiftCount}개`} />
        <GiftList value={giftBoxes} />
      </div>
      <Button disabled={filledGiftCount <= 1} size="lg">
        선물 배달하러 가기
      </Button>
    </div>
  );
};

export default Page;
