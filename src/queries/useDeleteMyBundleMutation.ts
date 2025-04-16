import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMyBundle } from "@/api/bundle/api";

export const useDeleteMyBundleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyBundle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Bundles"] }); // 삭제 후 목록 업데이트
    },
    onError: (error) => {
      console.error("보따리 삭제 실패:", error);
    },
  });
};
