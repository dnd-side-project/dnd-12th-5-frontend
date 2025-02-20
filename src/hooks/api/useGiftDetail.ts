import { useQuery } from "@tanstack/react-query";

const fetchGiftDetail = async (giftId: number, bundleId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/bundles/${bundleId}/gifts/${giftId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  return response.json();
};

export const useGiftDetail = (giftId: number, bundleId: number) => {
  return useQuery({
    queryKey: ["giftDetail"],
    queryFn: () => fetchGiftDetail(giftId, bundleId),
  });
};
