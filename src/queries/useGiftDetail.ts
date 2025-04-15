import { useQuery } from "@tanstack/react-query";
import { fetchGiftDetail } from "@/api/bundle/api";

export const useGiftDetail = (giftId: number, bundleId: number) => {
  return useQuery({
    queryKey: ["giftDetail"],
    queryFn: () => fetchGiftDetail(giftId, bundleId),
  });
};
