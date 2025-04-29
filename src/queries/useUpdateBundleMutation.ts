"use client";

import { useMutation } from "@tanstack/react-query";

import { updateBundle } from "@/api/bundle/api";
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
  });
};
