import { useMutation } from "@tanstack/react-query";

import { uploadGiftImages } from "@/api/gift-upload/api";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import { GiftBox } from "@/types/bundle/types";
import { ImageItem } from "@/types/gift-upload/types";

interface UseUploadImageMutationProps {
  combinedImages: ImageItem[];
  existingGift: GiftBox;
  index: number;
}

export const useUploadImageMutation = ({
  combinedImages,
  existingGift,
  index,
}: UseUploadImageMutationProps) => {
  const { updateGiftBox } = useGiftStore();

  return useMutation<string[], Error, FormData>({
    mutationFn: uploadGiftImages,
    onSuccess: (uploadedUrls: string[]) => {
      const existingUrls = combinedImages
        .filter((item) => item.type === "existing")
        .map((item) => item.url);
      const merged = [...existingUrls, ...uploadedUrls];
      updateGiftBox(index, { ...existingGift, imgUrls: merged });
    },
  });
};
