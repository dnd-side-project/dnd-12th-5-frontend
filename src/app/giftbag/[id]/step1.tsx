"use client";

import { Button } from "@/components/ui/button";
import { CHARACTER_MAP } from "@/data/deliveryCharacterData";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface Step1Props {
  delivery: string;
  color: string;
}

{
  /* 임시 매핑, 추후 백엔드 답변에 따라 수정해야 할 수도 있음 */
}

const TEXT_MAP: Record<string, string> = {
  pori: "똑똑 서프라이즈~ @ 보따리가 도착했어요!",
  chichi: "정성이 가득 담긴 @ 선물 보따리를 가져왔어요..",
  max: "어.. 오다 주웠다! @ 궁금하면 한번 열어보던가!",
  hearty: "두근두근! @사랑이 담긴 보따리를 같이 열어볼까요?",
};

const Step1 = ({ delivery, color }: Step1Props) => {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const character = CHARACTER_MAP[delivery] || "pori";
  const displayText = TEXT_MAP[character] || TEXT_MAP["pori"];

  const imageSrc = `/img/${character}_${color}.svg`;

  const handleOnClick = () => {
    // api 추가
    router.push(`/giftbag/${id}?step=2`);
  };

  return (
    <div className="h-full flex flex-col gap-[90px] justify-center items-center relative">
      <div className="h-[calc(100%-68px)] flex flex-col justify-center items-center gap-8">
        <p className="text-lg font-bold font-nanum text-center">
          {displayText.split("@").map((line, index) => (
            <span key={index}>
              {line}
              {index !== displayText.split("@").length - 1 && <br />}
            </span>
          ))}
        </p>
        <div className="w-[200px] h-[200px] flex justify-center items-center">
          <Image
            src={imageSrc}
            alt={`${character} delivery`}
            className="h-[185px] w-[143px]"
            width={185}
            height={143}
          />
        </div>
        <p className="text-center text-sm font-nanum text-gray-700 pt-[2px]">
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
  );
};

export default Step1;
