import { useQuery } from "@tanstack/react-query";

import { getDraftBundleGifts } from "@/api/bundle/api";

export const useDraftBundleGiftsQuery = (bundleId: number) => {
  return useQuery({
    queryKey: ["fillGift"],
    queryFn: () => getDraftBundleGifts(bundleId),
  });
};
