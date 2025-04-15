import { useQuery } from "@tanstack/react-query";
import { fetchFillGift } from "@/api/bundle/api";

export const useFillGift = (bundleId: number) => {
  return useQuery({
    queryKey: ["fillGift"],
    queryFn: () => fetchFillGift(bundleId),
  });
};
