"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { deleteUser } from "@/api/kakao/api";
import { toast } from "@/hooks/use-toast";
import { deleteToken } from "@/utils/tokenUtils";

export const useDeleteUserMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      router.push("/auth/login");
      deleteToken();
    },
    onError: () => {
      toast({
        title: "회원 탈퇴에 실패했어요.",
        description: "다시 시도해주세요.",
      });
    },
  });
};
