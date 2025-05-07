import { useMutation } from "@tanstack/react-query";

import { patchBundleName } from "@/api/my-bundle/api";
import { toast } from "@/hooks/use-toast";

interface EditBundleNameParams {
  name: string;
  bundleId: string;
}

export const useEditDraftBundleNameMutation = () => {
  return useMutation({
    mutationFn: ({ name, bundleId }: EditBundleNameParams) =>
      patchBundleName(bundleId, name),
    onError: () => {
      toast({
        title: "이름 수정에 실패했어요.",
        description: "다시 시도해주세요.",
      });
    },
  });
};
