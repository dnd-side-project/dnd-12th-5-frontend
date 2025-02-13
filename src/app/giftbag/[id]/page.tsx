"use client";

import { useSearchParams } from "next/navigation";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Page = () => {
  const searchParams = useSearchParams();
  const step = searchParams ? searchParams.get("step") : null;

  return (
    <div className={`h-full relative ${step === "2" && "bg-pink-50 "}`}>
      {step === "1" && <Step1 />}
      {step === "2" && <Step2 />}
      {step === "3" && <Step3 />}
    </div>
  );
};

export default Page;
