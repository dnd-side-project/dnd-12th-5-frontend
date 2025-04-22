import { useMutation, useQueryClient } from "@tanstack/react-query";

import { putDeliveryCharacter } from "@/api/bundle/api";
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
    onError: (error) => {
      console.error("배달부 설정 실패:", error);
    },
  });
};
