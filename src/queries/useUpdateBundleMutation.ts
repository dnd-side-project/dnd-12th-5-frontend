"use client";

import { useMutation } from "@tanstack/react-query";

import { updateBundle } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { GiftBox } from "@/types/bundle/types";
import { updateGiftBoxesFromResponse } from "@/utils/giftBoxUtils";

export const useUpdateBundleMutation = () => {
  const { giftBoxes } = useGiftStore();

  return useMutation({
    mutationFn: () => updateBundle(giftBoxes),
    onSuccess: (res) => {
      res.result.gifts.forEach((gift: GiftBox, index: number) => {
        useGiftStore.getState().updateGiftBox(index, { id: gift.id });
      });
      updateGiftBoxesFromResponse(res.result.gifts);
    },
    onError: () => {
      toast({
        title: "보따리 업데이트에 실패했어요.",
        description: "다시 시도해 주세요.",
      });
    },
  });
};
