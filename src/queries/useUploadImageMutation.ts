import { useMutation } from "@tanstack/react-query";

import { uploadGiftImages } from "@/api/gift-upload/api";
import { toast } from "@/hooks/use-toast";

export const useUploadImageMutation = () => {
  return useMutation<string[], Error, FormData>({
    mutationFn: uploadGiftImages,
    onError: () => {
      toast({
        title: "이미지를 서버에 업로드하는 데 실패했어요. ",
        description: "다시 시도해주세요.",
      });
    },
  });
};
