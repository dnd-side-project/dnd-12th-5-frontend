import { useQuery } from "@tanstack/react-query";

import { getMyBundleDetail } from "@/api/my-bundle/api";

export const useMyBundleDetailQuery = (id: number) => {
  return useQuery({
    queryKey: ["bundleDetail"],
    queryFn: () => getMyBundleDetail(id),
  });
};
