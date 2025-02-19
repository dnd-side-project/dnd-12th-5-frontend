import { useQuery } from "@tanstack/react-query";

const fetchMyGiftBagDetail = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/bundles/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  return response.json();
};

export const useMyGiftBagDetail = (id: number) => {
  return useQuery({
    queryKey: ["giftBagDetail"],
    queryFn: () => fetchMyGiftBagDetail(id),
  });
};
