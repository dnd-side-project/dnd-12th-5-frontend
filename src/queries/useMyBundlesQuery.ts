import { useQuery } from "@tanstack/react-query";

import { getMyBundles } from "@/api/bundle/api";

export const useMyBundlesQuery = () => {
  return useQuery({
    queryKey: ["bundles"],
    queryFn: getMyBundles,
  });
};
