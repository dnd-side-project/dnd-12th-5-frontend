"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ANSWER_MESSAGE_MAP,
  CHARACTERS,
  DELIVERY_CHARACTER_MAP,
} from "@/constants/constants";
import { CharacterKey } from "@/types/constants/types";

const Step3 = ({ delivery }: { delivery: string }) => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const characterInfo =
    CHARACTERS[delivery as CharacterKey] || CHARACTERS.CHARACTER_1;

  const characterName = characterInfo.ko;

  const characterData = DELIVERY_CHARACTER_MAP[characterName];
  const messageData = ANSWER_MESSAGE_MAP[characterName];

  const handleGoBack = () => {
    if (id) {
      router.push(`/bundle/${id}?step=2`);
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
          <p className="text-lg font-bold font-nanum tracking-[-0.03em]">
            {messageData.title}
          </p>
          <p className="text-sm font-nanum text-gray-700 pt-[2px] tracking-[-0.02em]">
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
