import { useQuery } from "@tanstack/react-query";

import { fetchResponseBundle } from "@/api/bundle/api";

export const useReceiveBundleQuery = (link: string) => {
  return useQuery({
    queryKey: ["receiveBundle", link],
    queryFn: () => fetchResponseBundle(link),
    enabled: !!link,
    refetchOnMount: "always",
  });
};
