"use client";

import { useSearchParams } from "next/navigation";

import Step1 from "./step1";
import Step2 from "./step2";

const Page = () => {
  const searchParams = useSearchParams();
  const step = searchParams?.get("step");

  return (
    <>
      {step === "1" && <Step1 />}
      {step === "2" && <Step2 />}
    </>
  );
};

export default Page;
