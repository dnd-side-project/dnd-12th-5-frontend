import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putDeliveryCharacter } from "@/api/bundle/api";
import { toast } from "@/hooks/use-toast";
import {
  PutCharacterResponse,
  PutCharacterPayload,
} from "@/types/bundle/types";

export const useDeliveryCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<PutCharacterResponse, Error, PutCharacterPayload>({
    mutationFn: (payload: PutCharacterPayload) => putDeliveryCharacter(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-bundle"] });
    },
    onError: () => {
      toast({
        title: "배달부 설정에 실패했어요.",
        description: "다시 시도해주세요.",
      });
    },
  });
};
