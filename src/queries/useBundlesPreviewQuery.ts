import { useQuery } from "@tanstack/react-query";

import { getBundlesPreview } from "@/api/bundle/api";

export const useBundlesPreviewQuery = () => {
  return useQuery({
    queryKey: ["bundlesPreview"],
    queryFn: getBundlesPreview,
  });
};
