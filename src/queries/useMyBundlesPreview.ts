import { PICKTORY_API } from "@/api/api-url";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

/** 메인화면 보따리 조회 api */

const fetchBundlePreview = async () => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.getBundlesPreview, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("데이터를 불러오는 데 실패했습니다.");
  }
  return response.json();
};

export const useBundlePreview = () => {
  return useQuery({
    queryKey: ["bundlePreview"],
    queryFn: fetchBundlePreview,
  });
};
