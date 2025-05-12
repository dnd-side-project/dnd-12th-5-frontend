"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import BundleErrorPage from "@/components/common/BundleErrorPage";
import Loading from "@/components/common/Loading";
import { useAnswerResultQuery } from "@/queries/useAnswerResultQuery";
import { useReceiveBundleQuery } from "@/queries/useReceiveBundleQuery";
import { useBundleAnswerCompletedStore } from "@/stores/bundle/useStore";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Page = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const step = searchParams?.get("step");
  const link = params?.id as string;

  const { data: bundle, isPending, isError } = useReceiveBundleQuery(link);

  const { data: giftResultData, isError: isGiftResultDataError } =
    useAnswerResultQuery(link, bundle);

  const { setIsBundleAnswerCompleted } = useBundleAnswerCompletedStore();

  useEffect(() => {
    if (bundle?.status) {
      setIsBundleAnswerCompleted(bundle.status === "COMPLETED");
    }
  }, [bundle?.status, setIsBundleAnswerCompleted]);

  const isBundleStatusCompleted = bundle?.status === "COMPLETED";
  const isGiftResultLoading =
    isBundleStatusCompleted && giftResultData === undefined;

  if (isPending || isGiftResultLoading)
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
        <BundleErrorPage />
      </div>
    );

  return (
    <div className={`relative h-full ${step === "2" && "bg-pink-50"}`}>
      {step === "1" && (
        <Step1
          delivery={bundle.deliveryCharacterType}
          color={bundle.designType.toLowerCase()}
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
