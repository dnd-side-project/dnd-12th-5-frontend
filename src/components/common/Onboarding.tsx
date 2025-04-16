import Image from "next/image";

import { Button } from "../ui/button";

import MainGraphic from "/public/img/onboarding_graphic.svg";

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[37px] bg-pink-50">
      <div className="flex flex-col gap-4">
        <p className="text-center font-nanum text-lg font-bold tracking-[-0.03em]">
          내가 고른 선물, 상대방도 좋아할까?
        </p>
        <p className="text-center text-xs font-medium text-gray-500">
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
      />

      <div className="absolute bottom-4 w-full px-4">
        <Button size="lg" onClick={onComplete}>
          선물 보따리 준비하러 가기
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
