import { useQuery } from "@tanstack/react-query";

import { getBundleResult } from "@/api/my-bundle/api";

export const useBundleResultQuery = (bundleId: string) => {
  return useQuery({
    queryKey: ["giftResults", bundleId],
    queryFn: () => getBundleResult(Number(bundleId)),
    enabled: !!bundleId,
  });
};
