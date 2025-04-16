"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

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
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute left-0 top-0 mt-[56px] h-full w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/img/background_union.svg')" }}
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-[38px]">
        <div className="flex h-[230px] w-[230px] items-center justify-center">
          <Image
            src={characterData.imageSrc}
            alt={`${characterName} delivery`}
            width={230}
            height={230}
          />
        </div>
        <div className="flex flex-col gap-[13px] text-center">
          <p className="font-nanum text-lg font-bold tracking-[-0.03em]">
            {messageData.title}
          </p>
          <p className="pt-[2px] font-nanum text-sm tracking-[-0.02em] text-gray-700">
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
          className="w-[212px] rounded-[60px] bg-white text-xs text-gray-400"
          onClick={handleGoBack}
        >
          내가 받은 선물 다시보러 가기
        </Button>
      </div>
    </div>
  );
};

export default Step3;
