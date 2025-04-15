import { PICKTORY_API } from "@/api/api-url";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

/** 보따리 마저 채우기 api */

const fetchFillGift = async (bundleId: number) => {
  const accessToken = getCookie("accessToken");

  if (!bundleId) return;

  const response = await fetch(PICKTORY_API.getDraftBundles(bundleId), {
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

export const useFillGift = (bundleId: number) => {
  return useQuery({
    queryKey: ["fillGift"],
    queryFn: () => fetchFillGift(bundleId),
  });
};
