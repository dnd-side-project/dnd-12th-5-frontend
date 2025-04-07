"use client";

import { useEditBoxStore, useGiftStore } from "@/stores/gift-upload/useStore";
import Chip from "@/components/bundle/Chip";
import GiftList from "@/components/bundle/GiftList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createBundle, updateBundle } from "@/api/bundle/api";
import { useSelectedBagStore, useBundleStore } from "@/stores/bundle/useStore";
import { useMutation } from "@tanstack/react-query";
import { GiftBox } from "@/types/bundle/types";
import { useEffect } from "react";

const Page = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftCount = giftBoxes.filter(
    (gift) => gift && gift.filled === true,
  ).length;

  const router = useRouter();
  const { selectedBagIndex } = useSelectedBagStore();
  const { bundleName } = useBundleStore();
  const { setIsBoxEditing } = useEditBoxStore();

  useEffect(() => {
    setIsBoxEditing(false);
  }, [setIsBoxEditing]);

  const createMutation = useMutation({
    mutationFn: () =>
      createBundle({
        bundleName,
        selectedBagIndex,
        giftBoxes,
      }),
    onSuccess: (res) => {
      if (res?.id) {
        sessionStorage.setItem("bundleId", res.id);
      }

      if (res?.gifts?.length) {
        res.gifts.forEach((gift: GiftBox, index: number) => {
          useGiftStore.getState().updateGiftBox(index, { id: gift.id });
        });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: () => updateBundle(giftBoxes),
    onSuccess: (res) => {
      res.result.gifts.forEach((gift: GiftBox, index: number) => {
        useGiftStore.getState().updateGiftBox(index, { id: gift.id });
      });
    },
  });

  const handleClickButton = async () => {
    try {
      const bundleId = sessionStorage.getItem("bundleId");

      if (!bundleId) {
        await createMutation.mutateAsync();
      } else {
        await updateMutation.mutateAsync();
      }

      router.push("/bundle/delivery?step=1");
    } catch (error) {
      alert(`보따리 저장에 실패했습니다. ${error}`);
    }
  };

  return (
    <div className="h-full bg-pink-50 px-4">
      <div className="h-full flex flex-col items-center justify-center relative">
        <div className="flex flex-col gap-7 w-[300px] items-center">
          <div className="absolute top-[10px]">
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
