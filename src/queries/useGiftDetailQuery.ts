import { useQuery } from "@tanstack/react-query";

import { getGiftDetail } from "@/api/bundle/api";

export const useGiftDetailQuery = (giftId: number, bundleId: number) => {
  return useQuery({
    queryKey: ["giftDetail"],
    queryFn: () => getGiftDetail(giftId, bundleId),
  });
};
