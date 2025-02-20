"use client";

import { Fragment } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import {
  API_CHARACTER_MAP,
  deliveryCharacterData,
} from "@/data/deliveryCharacterData";
import { Button } from "@/components/ui/button";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import {
  useGiftBagStore,
  useSelectedBagStore,
} from "@/stores/giftbag/useStore";
import { useDeliveryGiftBag } from "@/hooks/api/useDeliveryGiftBag";
import { DeliveryCharacterAPIType } from "@/types/giftbag/types";

const Step2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const character = searchParams ? searchParams.get("character") : null;

  const { setSelectedBagIndex } = useSelectedBagStore();
  const { setGiftBagName } = useGiftBagStore();

  const resetStore = () => {
    useGiftStore.setState({
      giftBoxes: Array(6).fill({
        name: "",
        filled: false,
        reason: "",
        tagIndex: 0,
        purchase_url: "",
        tag: "",
        imgUrls: [],
        id: null,
      }),
    });

    setSelectedBagIndex(0);
    setGiftBagName("");

    sessionStorage.removeItem("giftBagId"); //세션스토리지에서 보따리 id 삭제
  };

  const { mutate } = useDeliveryGiftBag();
  const giftBagId = sessionStorage.getItem("giftBagId");

  const handleApiPost = () => {
    if (giftBagId) {
      mutate(
        {
          giftBagId,
          deliveryCharacterType: API_CHARACTER_MAP[
            character || "포리"
          ] as DeliveryCharacterAPIType,
        },
        {
          onSuccess: (data) => {
            console.log("API 응답 데이터:", data);
            router.push(
              `/giftbag/delivery?step=3&character=${character}&link=${data.link}`,
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

  return (
    <>
      {character && (
        <div className="h-[calc(100%-52px)] w-full flex flex-col items-center justify-center gap-7">
          <section className="flex flex-col items-center ">
            <div className="flex flex-col items-center">
              <div className="mb-[3px] ">
                <p className="font-nanum text-xs font-bold">
                  {deliveryCharacterData[character].title}
                </p>
              </div>
              <Image
                src={deliveryCharacterData[character].imageSrc}
                alt="delivery"
                width={200}
                height={200}
                style={{ width: "200px", height: "200px" }}
                className="mb-[22px]"
              />
              <div className="mb-7">
                <h1 className="text-gray-800 text-center text-2xl font-bold font-nanum">
                  {character || "포리"}
                </h1>
              </div>
              <div>
                <p className="text-xs text-gray-700 font-medium text-center">
                  {deliveryCharacterData[character].description
                    .split("\n")
                    .map((line, index) => (
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
    </>
  );
};

export default Step2;
