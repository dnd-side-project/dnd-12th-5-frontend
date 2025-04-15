import { useQuery } from "@tanstack/react-query";
import { fetchMyBundleDetail } from "@/api/bundle/api";

export const useMyBundleDetail = (id: number) => {
  return useQuery({
    queryKey: ["bundleDetail"],
    queryFn: () => fetchMyBundleDetail(id),
  });
};
