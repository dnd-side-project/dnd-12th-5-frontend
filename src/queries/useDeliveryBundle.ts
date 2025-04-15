import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putDelivery } from "@/api/bundle/api";
import {
  PutCharacterResponse,
  PutCharacterPayload,
} from "@/types/bundle/types";

export const useDeliveryBundle = () => {
  const queryClient = useQueryClient();

  return useMutation<PutCharacterResponse, Error, PutCharacterPayload>({
    mutationFn: (payload: PutCharacterPayload) => putDelivery(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-bundle"] });
    },
    onError: (error) => {
      console.error("배달부 설정 실패:", error);
    },
  });
};
