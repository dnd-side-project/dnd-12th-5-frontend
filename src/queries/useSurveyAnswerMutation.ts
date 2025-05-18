import { useMutation } from "@tanstack/react-query";

import { postSurveyAnswer } from "@/api/survey/api";
import { toast } from "@/hooks/use-toast";

export const useSurveyAnswerMutation = () => {
  return useMutation({
    mutationFn: (data: { surveySatisfaction: string }) =>
      postSurveyAnswer(data),
    onError: () => {
      toast({
        title: "설문 조사 응답 제출에 실패했어요.",
        description: "다시 시도해 주세요.",
      });
    },
  });
};
