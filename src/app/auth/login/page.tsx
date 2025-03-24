"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import Onboarding from "@/components/common/Onboarding";
import KakaoLoginButton from "@/components/common/KakaoLoginButton";

import MainGraphic from "/public/img/login_graphic.svg";

const Page = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  const getMotionProps = (direction: "left" | "right") => {
    const isLeft = direction === "left";
    return {
      initial: { opacity: 0, x: isLeft ? -20 : 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: isLeft ? 20 : -20 },
      transition: { duration: 0.5 },
    };
  };

  return (
    <AnimatePresence mode="wait">
      {!isOnboardingComplete ? (
        <motion.div
          key="/auth/login"
          {...getMotionProps("left")}
          className="h-full"
        >
          <Onboarding onComplete={handleOnboardingComplete} />
        </motion.div>
      ) : (
        <motion.div key="login" {...getMotionProps("right")} className="h-full">
          <div className="w-full h-full bg-pink-50">
            <p className="text-lg text-center font-bold tracking-[-0.03em] font-nanum pt-[42px] flex justify-center items-center h-full pb-[487px]">
              선물 보따리를 안전하게 보관하기 위해 <br />
              로그인이 필요해요!
            </p>
            <Image
              src={MainGraphic}
              alt="MainGraphic"
              width={430}
              height={396}
              loading="eager"
              className="absolute bottom-0"
            />
          </div>
          <div className="w-full absolute bottom-4 px-4">
            <KakaoLoginButton link={KAKAO_AUTH_URL} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Page;
