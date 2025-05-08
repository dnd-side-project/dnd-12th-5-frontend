import { useQuery } from "@tanstack/react-query";

import { getBundlesPreview } from "@/api/my-bundle/api";

export const useBundlesPreviewQuery = () => {
  return useQuery({
    queryKey: ["bundlesPreview"],
    queryFn: getBundlesPreview,
  });
};
