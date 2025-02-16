"use client";

import { useGiftStore } from "@/stores/gift-upload/useStore";
import Chip from "@/components/giftbag/Chip";
import GiftList from "@/components/giftbag/GiftList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftCount = giftBoxes.filter((gift) => gift.filled).length;
  const router = useRouter();

  return (
    <div className="h-full bg-pink-50 px-4">
      <div className="h-full flex flex-col items-center justify-center relative">
        <div className="flex flex-col gap-7 w-[300px] items-center">
          <div className="absolute top-4">
            <Chip text={`채워진 선물박스 ${filledGiftCount}개`} width="126px" />
          </div>
          <GiftList value={giftBoxes} />
        </div>
        <div className="w-full px-4 absolute bottom-4">
          <Button
            disabled={filledGiftCount <= 1}
            size="lg"
            onClick={() => router.push("/giftbag/delivery?step=1")}
          >
            선물 배달하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
