import Image from "next/image";

import { Button } from "./ui/button";
import MainGraphic from "/public/img/onboarding_graphic.svg";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 bg-pink-50">
        <div className="mb-[37px]">
          <p className="text-center text-lg font-bold font-nanum">
            내가 고른 선물, 상대방도 좋아할까?
          </p>
          <p className="text-center text-gray-500 text-xs font-medium">
            선물 후보들을 보따리에 담아주시면 <br /> 상대방의 생각을 후다닥
            물어보고 올게요!
          </p>
        </div>

        <Image
          src={MainGraphic}
          alt="MainGraphic"
          width={430}
          height={396}
          loading="eager"
          className="mb-[68px]"
        />
      </div>
      <div className="w-full bottom-4 absolute px-4">
        <Button size="lg" onClick={onComplete}>
          선물 보따리 준비하러 가기
        </Button>
      </div>
    </>
  );
};

export default Onboarding;
