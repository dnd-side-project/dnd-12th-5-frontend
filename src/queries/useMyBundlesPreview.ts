import { useQuery } from "@tanstack/react-query";
import { fetchBundlePreview } from "@/api/bundle/api";

export const useBundlePreview = () => {
  return useQuery({
    queryKey: ["bundlePreview"],
    queryFn: fetchBundlePreview,
  });
};
