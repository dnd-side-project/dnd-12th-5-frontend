import { useMutation } from "@tanstack/react-query";

import { patchBundleName } from "@/api/bundle/api";

export const useEditDraftBundleNameMutation = (
  name: string,
  bundleId: string,
) => {
  return useMutation({
    mutationFn: () => patchBundleName(bundleId, name),
    onError: (error) => {
      console.error("이름 수정 실패:", error);
    },
  });
};
