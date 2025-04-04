import { PICKTORY_API } from "@/api/api-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

/** 보따리 삭제 */

const deleteBundle = async (bundleId: number) => {
  const accessToken = getCookie("accessToken");

  const response = await fetch(PICKTORY_API.deleteBundle(bundleId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("보따리 삭제에 실패했습니다.");
  }
};

export const useDeleteBundle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBundle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Bundles"] }); // 삭제 후 목록 업데이트
    },
    onError: (error) => {
      console.error("보따리 삭제 실패:", error);
    },
  });
};
