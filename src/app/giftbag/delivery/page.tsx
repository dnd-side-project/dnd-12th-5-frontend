"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams ? searchParams.get("step") : null;

  const handleApiPost = () => {
    // 19. 배달부 설정 API
    // PUT /api/v1/bundles/{id}/delivery;
    // body: { delivery_character_type: selectedCharacter }
  };

  const handleNextStep = (selectedCharacter: string) => {
    if (step === "1") {
      router.push(`/giftbag/delivery?step=2&character=${selectedCharacter}`);
    } else if (step === "2") {
      handleApiPost();
      router.push(`/giftbag/delivery?step=3&character=${selectedCharacter}`);
    }
  };

  return (
    <div className="h-full px-4 pb-4 relative">
      {step === "1" && <Step1 onNextStep={handleNextStep} />}
      {step === "2" && <Step2 onNextStep={handleNextStep} />}
      {step === "3" && <Step3 />}
    </div>
  );
};

export default Page;
