"use client";

import { Fragment } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGiftBagStore } from "@/stores/giftbag/useStore";
import { useDeliveryGiftBag } from "@/hooks/api/useDeliveryGiftBag";
import { CHARACTERS, DELIVERY_CHARACTER_MAP } from "@/constants/constants";
import { resetGiftBoxes } from "@/utils/utils";
import { CharacterKey } from "@/types/constants/types";

const Step2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const characterKo = searchParams?.get("character") ?? "포리";

  const characterEntry = Object.entries(CHARACTERS).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, value]) => value.ko === characterKo,
  );

  const characterKey = (characterEntry?.[0] ?? "CHARACTER_1") as CharacterKey;

  const { setGiftBagName } = useGiftBagStore();

  const resetStore = () => {
    resetGiftBoxes();
    setGiftBagName("");
    sessionStorage.removeItem("giftBagId");
  };

  const { mutate } = useDeliveryGiftBag();
  const giftBagId = sessionStorage.getItem("giftBagId");

  const handleApiPost = () => {
    if (giftBagId) {
      mutate(
        {
          giftBagId,
          deliveryCharacterType: characterKey,
        },
        {
          onSuccess: (data) => {
            router.push(
              `/giftbag/delivery?step=3&character=${characterKo}&link=${data.link}`,
            );
          },
          onError: (error) => {
            console.error("API 호출 실패:", error);
          },
        },
      );
    }
  };

  const handleClickButton = () => {
    handleApiPost();
    resetStore();
  };

  const characterData = DELIVERY_CHARACTER_MAP[characterKo];

  return (
    <div className="h-full bg-[url('/img/background_union.svg')] bg-cover bg-center">
      {characterData && (
        <div className="h-[calc(100%-52px)] w-full flex flex-col items-center justify-center gap-7">
          <section className="flex flex-col items-center ">
            <div className="flex flex-col items-center ">
              <div className="mb-[3px] ">
                <p className="font-nanum text-lg font-bold text-center tracking-[-0.03em]">
                  {characterData.title.split("\n").map((line, index) => (
                    <p key={index}>
                      {line}
                      <br />
                    </p>
                  ))}
                </p>
              </div>
              <Image
                src={characterData.imageSrc}
                alt="delivery"
                width={200}
                height={200}
                style={{ width: "200px", height: "200px" }}
                className="mb-[26px] mt-[35px]"
              />
              <div className="mb-[17px] px-[30px] py-[1px] bg-white rounded-[30px]">
                <h1 className="text-gray-800 text-center text-lg font-bold font-nanum mt-1 tracking-[-3%]">
                  {characterKo}
                </h1>
              </div>
              <div>
                <p className="text-[15px] text-gray-700 font-medium text-center">
                  {characterData.description.split("\n").map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
          </section>
          <div className="w-full px-4 absolute bottom-4">
            <Button onClick={handleClickButton} size="lg">
              선물 보따리 배달하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
