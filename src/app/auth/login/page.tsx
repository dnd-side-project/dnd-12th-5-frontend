"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Onboarding from "@/components/Onboarding";
import KakaoLoginButton from "@/components/KakaoLoginButton";

const Page = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!isOnboardingComplete ? (
        <motion.div
          key="/auth/login"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <Onboarding onComplete={handleOnboardingComplete} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            <section className="w-[340px] h-[442px] bg-gray-100">
              그래픽
            </section>
            <p className="text-center">
              선물 보따리를 안전하게 보관하기 위해서는 <br /> 로그인이 필요해요!
            </p>
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
