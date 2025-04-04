import { PICKTORY_API } from "@/api/api-url";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

/** 보따리 목록 조회 api */

const fetchBundles = async () => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getBundles, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const useBundles = () => {
  return useQuery({
    queryKey: ["bundles"],
    queryFn: fetchBundles,
  });
};
