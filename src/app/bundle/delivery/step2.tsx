"use client";

import { Fragment } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useBundleStore } from "@/stores/bundle/useStore";
import { useDeliveryBundle } from "@/hooks/api/useDeliveryBundle";
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

  const { setBundleName } = useBundleStore();

  const resetStore = () => {
    resetGiftBoxes();
    setBundleName("");
    sessionStorage.removeItem("bundleId");
  };

  const { mutate } = useDeliveryBundle();
  const bundleId = Number(sessionStorage.getItem("bundleId"));

  const handleApiPost = () => {
    if (bundleId) {
      mutate(
        {
          bundleId,
          deliveryCharacterType: characterKey,
        },
        {
          onSuccess: (data) => {
            router.push(
              `/bundle/delivery?step=3&character=${characterKo}&link=${data.link}`,
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
        <div className="flex h-[calc(100%-52px)] w-full flex-col items-center justify-center gap-7">
          <section className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="mb-[3px]">
                <p className="text-center font-nanum text-lg font-bold tracking-[-0.03em]">
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
              <div className="mb-[17px] rounded-[30px] bg-white px-[30px] py-[1px]">
                <h1 className="mt-1 text-center font-nanum text-lg font-bold tracking-[-3%] text-gray-800">
                  {characterKo}
                </h1>
              </div>
              <div>
                <p className="text-center text-[15px] font-medium text-gray-700">
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
          <div className="absolute bottom-4 w-full px-4">
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
