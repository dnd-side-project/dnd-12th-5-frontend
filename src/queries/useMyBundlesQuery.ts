import { useQuery } from "@tanstack/react-query";

import { getMyBundles } from "@/api/my-bundle/api";

export const useMyBundlesQuery = () => {
  return useQuery({
    queryKey: ["bundles"],
    queryFn: getMyBundles,
  });
};
