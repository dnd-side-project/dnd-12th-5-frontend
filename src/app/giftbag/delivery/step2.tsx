"use client";

import { Fragment } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { deliveryCharacterData } from "@/data/deliveryCharacterData";
import { Button } from "@/components/ui/button";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import {
  useGiftBagStore,
  useSelectedBagStore,
} from "@/stores/giftbag/useStore";
import { createGiftBag } from "@/api/giftbag/api";

interface Step2Props {
  onNextStep: (selectedCharacter: string) => void;
}

const Step2 = ({ onNextStep }: Step2Props) => {
  const searchParams = useSearchParams();
  const character = searchParams ? searchParams.get("character") : null;
  const { setSelectedBagIndex, selectedBagIndex } = useSelectedBagStore();
  const { setGiftBagName, giftBagName } = useGiftBagStore();
  const { giftBoxes } = useGiftStore();

  const resetStore = () => {
    useGiftStore.setState({
      giftBoxes: Array(6).fill({
        name: "",
        filled: false,
        reason: "",
        tagIndex: 0,
        purchase_url: "",
        tag: "",
        imageUrls: [],
      }),
    });

    setSelectedBagIndex(0);
    setGiftBagName("");
  };

  const mutation = useMutation({
    mutationFn: () =>
      createGiftBag({
        giftBagName,
        selectedBagIndex,
        giftBoxes,
      }),
    onSuccess: () => {
      resetStore();
      onNextStep(character || "포리");
    },
  });

  return (
    <div className="h-[calc(100%-52px)] w-full flex flex-col items-center justify-center gap-7">
      <section className="flex flex-col items-center ">
        <div className="flex flex-col items-center">
          <div className="mb-[3px] ">
            <p className="font-nanum text-xs font-bold">
              {deliveryCharacterData[character || "포리"].bubbleText}
            </p>
          </div>
          <Image
            src={deliveryCharacterData[character || "포리"].imageSrc}
            alt="delivery"
            width={200}
            height={200}
            style={{ width: "200px", height: "200px" }}
            className="mb-[22px]"
          />
          <div className="mb-7">
            <p className="text-gray-400 font-bold font-nanum">
              {deliveryCharacterData[character || "포리"].jobTitle}
            </p>
            <h1 className="text-gray-800 text-center text-2xl font-bold font-nanum">
              {character || "포리"}
            </h1>
          </div>
          <div>
            <p className="text-xs text-gray-700 font-medium text-center">
              {deliveryCharacterData[character || "포리"].description
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
        <Button
          onClick={() => {
            mutation.mutate();
          }}
          size="lg"
        >
          선물 보따리 배달하기
        </Button>
      </div>
    </div>
  );
};

export default Step2;
