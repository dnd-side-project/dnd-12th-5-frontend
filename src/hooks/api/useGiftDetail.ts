import { PICKTORY_API } from "@/api/api-url";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

/** 보따리 개별 선물 조회 api */

const fetchGiftDetail = async (giftId: number, bundleId: number) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(
    PICKTORY_API.getBundleResultDetail(bundleId, giftId),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }

  return response.json();
};

export const useGiftDetail = (giftId: number, bundleId: number) => {
  return useQuery({
    queryKey: ["giftDetail"],
    queryFn: () => fetchGiftDetail(giftId, bundleId),
  });
};
