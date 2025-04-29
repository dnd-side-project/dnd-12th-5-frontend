"use client";

import { useMutation } from "@tanstack/react-query";

import { createBundle } from "@/api/bundle/api";
import { useBundleStore, useSelectedBagStore } from "@/stores/bundle/useStore";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { updateGiftBoxesFromResponse } from "@/utils/giftBoxUtils";

export const useCreateBundleMutation = () => {
  const { giftBoxes } = useGiftStore();
  const { bundleName } = useBundleStore();
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
  });
};
