import { PICKTORY_API } from "@/api/api-url";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

/** 보따리 간이 조회 api */

const fetchMyBundleDetail = async (id: number) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getBundleDetail(id), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  return response.json();
};

export const useMyBundleDetail = (id: number) => {
  return useQuery({
    queryKey: ["bundleDetail"],
    queryFn: () => fetchMyBundleDetail(id),
  });
};
