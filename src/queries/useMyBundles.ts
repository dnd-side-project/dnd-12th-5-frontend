import { useQuery } from "@tanstack/react-query";
import { fetchBundles } from "@/api/bundle/api";

export const useBundles = () => {
  return useQuery({
    queryKey: ["bundles"],
    queryFn: fetchBundles,
  });
};
