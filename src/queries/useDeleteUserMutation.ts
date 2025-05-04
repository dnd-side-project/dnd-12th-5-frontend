"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/api/kakao/api";
import { useRouter } from "next/navigation";
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
