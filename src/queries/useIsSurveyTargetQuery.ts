import { useQuery } from "@tanstack/react-query";

import { getIsSurveyTarget } from "@/api/survey/api";

export const useIsSurveyTargetQuery = () => {
  return useQuery({
    queryKey: ["isSurveyTarget"],
    queryFn: () => getIsSurveyTarget(),
  });
};
