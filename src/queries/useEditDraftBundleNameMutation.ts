import { useMutation } from "@tanstack/react-query";

import { patchBundleName } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";

export const useEditDraftBundleNameMutation = (
  name: string,
  bundleId: string,
) => {
  return useMutation({
    mutationFn: () => patchBundleName(bundleId, name),
    onError: () => {
      toast({
        title: "이름 수정에 실패했어요.",
        description: "다시 시도해주세요.",
      });
    },
  });
};
