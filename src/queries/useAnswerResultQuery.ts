import { useQuery } from "@tanstack/react-query";

import { getSubmittedAnswers } from "@/api/bundle/api";
import { ReceiveBundle } from "@/types/bundle/types";

export const useAnswerResultQuery = (
  link: string,
  bundle: ReceiveBundle | undefined,
) => {
  return useQuery({
    queryKey: ["answerResults", bundle?.id],
    queryFn: () => getSubmittedAnswers(link),
    enabled: !!bundle?.id && bundle?.status === "COMPLETED",
  });
};
