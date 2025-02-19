"use client";

import { useGiftStore } from "@/stores/gift-upload/useStore";
import Chip from "@/components/giftbag/Chip";
import GiftList from "@/components/giftbag/GiftList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createGiftBag } from "@/api/giftbag/api";
import {
  useSelectedBagStore,
  useGiftBagStore,
} from "@/stores/giftbag/useStore";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const Page = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftCount = giftBoxes.filter((gift) => gift.filled).length;
  const router = useRouter();
  const { selectedBagIndex } = useSelectedBagStore();
  const { giftBagName } = useGiftBagStore();

  const [giftBagId, setGiftBagId] = useState<string | null>(
    () => sessionStorage.getItem("giftBagId") || null,
  );

  useEffect(() => {
    if (giftBagId) {
      sessionStorage.setItem("giftBagId", giftBagId);
    }
  }, [giftBagId]);

  const mutation = useMutation({
    mutationFn: () =>
      createGiftBag({
        giftBagName,
        selectedBagIndex,
        giftBoxes,
      }),
    onSuccess: (res) => {
      if (res?.id) {
        setGiftBagId(res.id);
      }
    },
  });

  const handleClickButton = () => {
    mutation.mutate();
    router.push("/giftbag/delivery?step=1");
  };

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
            onClick={handleClickButton}
          >
            선물 배달하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
