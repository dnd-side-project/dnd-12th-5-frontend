import { PICKTORY_API } from "@/api/api-url";
import { CharacterKey } from "@/types/constants/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export interface PutDeliveryPayload {
  bundleId: number;
  deliveryCharacterType: CharacterKey;
}

export interface PutDeliveryResponse {
  link: string;
}

const putDelivery = async ({
  bundleId,
  deliveryCharacterType,
}: PutDeliveryPayload): Promise<PutDeliveryResponse> => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.putBundleDelivery(bundleId), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deliveryCharacterType: deliveryCharacterType }),
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
};

export const useDeliveryBundle = () => {
  const queryClient = useQueryClient();

  return useMutation<PutDeliveryResponse, Error, PutDeliveryPayload>({
    mutationFn: (payload: PutDeliveryPayload) => putDelivery(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-bundle"] });
    },
  });
};
