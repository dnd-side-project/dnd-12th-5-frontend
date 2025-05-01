import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteMyBundle } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";

export const useDeleteMyBundleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyBundle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bundles"] }); // 삭제 후 목록 업데이트
    },
    onError: () => {
      toast({
        title: "보따리를 삭제하는데 실패했어요.",
        description: "다시 시도해주세요.",
      });
    },
  });
};
