"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";

import { fetchResponseBundle, getAnswerResult } from "@/api/bundle/api";
import Loading from "@/components/common/Loading";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Page = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const step = searchParams?.get("step");
  const link = params?.id as string;

  const {
    data: bundle,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["receiveBundle", link],
    queryFn: () => fetchResponseBundle(link),
    enabled: !!link,
  });

  const { data: giftResultData, isError: isGiftResultDataError } = useQuery({
    queryKey: ["answerResults", bundle?.id],
    queryFn: () => getAnswerResult(link),
    enabled: !!bundle?.id && bundle?.status === "COMPLETED",
  });

  if (isPending)
    return (
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Loading />
        </div>
      </div>
    );

  if (isError || !bundle || isGiftResultDataError)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">ERROR</h1>
        <p className="mt-2 text-lg text-gray-600">
          보따리를 불러오는 중에 오류가 발생했어요!
        </p>
      </div>
    );

  return (
    <div className={`relative h-full ${step === "2" && "bg-pink-50"}`}>
      {step === "1" && (
        <Step1
          delivery={bundle.deliveryCharacterType}
          color={bundle.designType.toLowerCase()}
          isCompleted={bundle.status === "COMPLETED"}
        />
      )}
      {step === "2" && (
        <Step2
          gifts={bundle.gifts}
          giftResultData={giftResultData}
          isCompleted={bundle.status === "COMPLETED"}
        />
      )}
      {step === "3" && <Step3 delivery={bundle.deliveryCharacterType} />}
    </div>
  );
};

export default Page;
