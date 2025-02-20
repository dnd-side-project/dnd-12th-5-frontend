import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteGiftBag = async (giftBagId: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`/api/v1/bundles/${giftBagId}`, {
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

export const useDeleteGiftBag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGiftBag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["giftBags"] }); // 삭제 후 목록 업데이트
    },
    onError: (error) => {
      console.error("보따리 삭제 실패:", error);
    },
  });
};
