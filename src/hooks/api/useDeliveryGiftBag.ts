import { DeliveryCharacterAPIType } from "@/types/giftbag/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface PutDeliveryPayload {
  giftBagId: string;
  deliveryCharacterType: DeliveryCharacterAPIType;
}

export interface PutDeliveryResponse {
  link: string;
}

const putDelivery = async ({
  giftBagId,
  deliveryCharacterType,
}: PutDeliveryPayload): Promise<PutDeliveryResponse> => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/bundles/${giftBagId}/delivery`, {
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

export const useDeliveryGiftBag = () => {
  const queryClient = useQueryClient();

  return useMutation<PutDeliveryResponse, Error, PutDeliveryPayload>({
    mutationFn: (payload: PutDeliveryPayload) => putDelivery(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-giftbag"] });
    },
  });
};
