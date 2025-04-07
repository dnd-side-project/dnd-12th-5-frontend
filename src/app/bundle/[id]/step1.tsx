"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CHARACTERS, DELIVERY_RECEIVE_TEXT_MAP } from "@/constants/constants";
import { Step1Props } from "@/types/bundle/types";
import { CharacterKey } from "@/types/constants/types";

const Step1 = ({ delivery, color, isCompleted }: Step1Props) => {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const characterInfo =
    CHARACTERS[delivery as CharacterKey] || CHARACTERS.CHARACTER_1;
  const characterKo = characterInfo.ko;
  const characterEn = characterInfo.en;

  const displayText =
    DELIVERY_RECEIVE_TEXT_MAP[characterKo] || DELIVERY_RECEIVE_TEXT_MAP["포리"];

  const imageSrc = `/img/${characterEn}_${color}.svg`;

  const handleOnClick = () => {
    router.push(`/bundle/${id}?step=2`);
  };

  return (
    <div className="relative w-full overflow-hidden h-full">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center mt-[56px]"
        style={{ backgroundImage: "url('/img/background_union.svg')" }}
      />
      <div className="h-full flex flex-col gap-[90px] justify-center items-center relative">
        <div className="flex flex-col justify-center items-center gap-8">
          <p className="text-lg font-bold font-nanum text-center tracking-[-0.03em]">
            {isCompleted ? (
              <>
                답변이 완료된 보따리에요. <br /> 어떤 선물을 받게될지
                기대하세요!
              </>
            ) : (
              displayText.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== displayText.split("\n").length - 1 && <br />}
                </span>
              ))
            )}
          </p>
          <div className="flex justify-center items-center">
            <Image
              src={imageSrc}
              alt={`${characterKo} delivery`}
              width={230}
              height={230}
            />
          </div>
          {!isCompleted && (
            <p className="text-center text-sm tracking-[-2%] font-nanum text-gray-700 pt-[2px]">
              정성껏 고른 선물 후보들이 담긴 보따리예요. <br /> 마음에 드는
              선물을 배달부에게 살짝 알려주세요!
            </p>
          )}
        </div>
        {!isCompleted && (
          <div className="absolute bottom-4 px-4 w-full">
            <Button size="lg" onClick={handleOnClick}>
              선물 보따리 풀어보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1;
