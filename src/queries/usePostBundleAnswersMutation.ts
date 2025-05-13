import { useMutation } from "@tanstack/react-query";

import { postBundleAnswers } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";

export const usePostBundleAnswersMutation = (link: string) => {
  return useMutation({
    mutationFn: (data: {
      bundleId: number;
      gifts: { giftId: number; responseTag: string }[];
    }) => postBundleAnswers(link, data),
    onError: () => {
      toast({
        title: "답변 전송에 실패했어요.",
      });
    },
  });
};
