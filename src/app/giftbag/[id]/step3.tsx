"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ANSWER_MESSAGE_MAP,
  CHARACTER_MAP,
  deliveryCharacterData,
} from "@/data/deliveryCharacterData";

interface Step3Props {
  delivery: string;
}

const Step3 = ({ delivery }: Step3Props) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const characterName = CHARACTER_MAP[delivery] || "포리";

  const characterData = deliveryCharacterData[characterName];
  const messageData = ANSWER_MESSAGE_MAP[characterName];

  const handleGoBack = () => {
    if (id) {
      router.push(`/giftbag/${id}?step=2`);
    }
  };

  return (
    <div className="relative w-full overflow-hidden h-full">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center mt-[56px]"
        style={{ backgroundImage: "url('/img/background_union.svg')" }}
      />
      <div className="relative z-10 flex flex-col gap-[38px] justify-center items-center min-h-screen">
        <div className="w-[230px] h-[230px] flex justify-center items-center">
          <Image
            src={characterData.imageSrc}
            alt={`${characterName} delivery`}
            width={230}
            height={230}
          />
        </div>
        <div className="flex flex-col gap-[13px] text-center">
          <p className="text-lg font-bold font-nanum">{messageData.title}</p>
          <p className="text-sm font-nanum text-gray-700 pt-[2px]">
            {messageData.description.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index !== messageData.description.split("\n").length - 1 && (
                  <br />
                )}
              </span>
            ))}
          </p>
        </div>
        <Button
          variant="secondary"
          className="text-xs text-gray-400 w-[212px] rounded-[60px] bg-white"
          onClick={handleGoBack}
        >
          내가 받은 선물 다시보러 가기
        </Button>
      </div>
    </div>
  );
};

export default Step3;
