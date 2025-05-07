"use client";

import { useMutation } from "@tanstack/react-query";

import { createBundle } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";
import {
  useBundleNameStore,
  useSelectedBagStore,
} from "@/stores/bundle/useStore";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { updateGiftBoxesFromResponse } from "@/utils/giftBoxUtils";

export const useCreateBundleMutation = () => {
  const { giftBoxes } = useGiftStore();
  const { bundleName } = useBundleNameStore();
  const { selectedBagIndex } = useSelectedBagStore();

  return useMutation({
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
        updateGiftBoxesFromResponse(res.gifts);
      }
    },
    onError: () => {
      toast({
        title: "보따리 생성에 실패했어요.",
        description: "다시 시도해 주세요.",
      });
    },
  });
};
