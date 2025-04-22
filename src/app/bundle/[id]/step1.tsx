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
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-0 top-0 mt-[56px] h-full w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/img/background_union.svg')" }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-[90px]">
        <div className="flex flex-col items-center justify-center gap-8">
          <p className="text-center font-nanum text-lg font-bold tracking-[-0.03em]">
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
          <div className="flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={`${characterKo} delivery`}
              width={230}
              height={230}
            />
          </div>
          {!isCompleted && (
            <p className="pt-[2px] text-center font-nanum text-sm tracking-[-2%] text-gray-700">
              정성껏 고른 선물 후보들이 담긴 보따리예요. <br /> 마음에 드는
              선물을 배달부에게 살짝 알려주세요!
            </p>
          )}
        </div>
        {!isCompleted && (
          <div className="absolute bottom-4 w-full px-4">
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
