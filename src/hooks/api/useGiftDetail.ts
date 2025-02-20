import { useQuery } from "@tanstack/react-query";

const fetchGiftDetail = async (giftId: number, giftBagId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/bundles/${giftBagId}/gifts/${giftId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
};

export const useGiftDetail = (giftId: number, giftBagId: number) => {
  return useQuery({
    queryKey: ["giftDetail"],
    queryFn: () => fetchGiftDetail(giftId, giftBagId),
  });
};
