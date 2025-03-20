"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CHARACTER_EN_MAP, CHARACTER_MAP } from "@/constants/constants";
import { DELIVERY_RECEIVE_TEXT_MAP } from "@/data/deliveryCharacterData";

interface Step1Props {
  delivery: string;
  color: string;
  isCompleted: boolean;
}

const Step1 = ({ delivery, color, isCompleted }: Step1Props) => {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const character = CHARACTER_MAP[delivery] || "포리";
  const displayText =
    DELIVERY_RECEIVE_TEXT_MAP[character] || DELIVERY_RECEIVE_TEXT_MAP["포리"];

  // 한글 -> 영어로 변환 후 이미지 경로 설정
  const characterEn = CHARACTER_EN_MAP[character] || "pori";
  const imageSrc = `/img/${characterEn}_${color}.svg`;

  const handleOnClick = () => {
    // api 추가
    router.push(`/giftbag/${id}?step=2`);
  };

  if (isCompleted) {
    return (
      <div className="relative w-full overflow-hidden h-full">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center mt-[56px]"
          style={{ backgroundImage: "url('/img/background_union.svg')" }}
        />
        <div className="h-full flex flex-col gap-[90px] justify-center items-center relative">
          <div className="flex flex-col justify-center items-center gap-8">
            <p className="text-lg font-bold font-nanum text-center">
              답변이 완료된 보따리에요. <br /> 어떤 선물을 받게될지 기대하세요!
            </p>
            <div className="flex justify-center items-center">
              <Image
                src={imageSrc}
                alt={`${character} delivery`}
                width={230}
                height={230}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden h-full">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center mt-[56px]"
        style={{ backgroundImage: "url('/img/background_union.svg')" }}
      />
      <div className="h-full flex flex-col gap-[90px] justify-center items-center relative">
        <div className="flex flex-col justify-center items-center gap-8">
          <p className="tracking-[-0.03em] text-lg font-bold font-nanum text-center">
            {displayText.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index !== displayText.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
          <div className="flex justify-center items-center">
            <Image
              src={imageSrc}
              alt={`${character} delivery`}
              width={230}
              height={230}
            />
          </div>
          <p className="text-center text-sm tracking-[-2%] font-nanum text-gray-700 pt-[2px]">
            정성껏 고른 선물 후보들이 담긴 보따리예요. <br /> 마음에 드는 선물을
            배달부에게 살짝 알려주세요!
          </p>
        </div>
        <div className="absolute bottom-4 px-4 w-full">
          <Button size="lg" onClick={handleOnClick}>
            선물 보따리 풀어보기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
