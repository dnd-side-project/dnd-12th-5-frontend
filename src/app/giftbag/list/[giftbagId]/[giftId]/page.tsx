"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import LinkButton from "@/components/common/LinkButton";
import Loading from "@/components/common/Loading";

import { filledGiftList } from "@/data/giftbagData";
import { useGiftNameStore } from "@/stores/giftbag/useStore";

const Page = () => {
  const { giftId } = useParams() as { giftId: string };
  const { setGiftName } = useGiftNameStore();

  useEffect(() => {
    setGiftName(filledGiftList[parseInt(giftId)].name);
  }, [giftId, setGiftName]);

  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>(
    filledGiftList.reduce(
      (acc, _, index) => {
        acc[index] = 0;
        return acc;
      },
      {} as { [key: number]: number },
    ),
  );

  const [innerCarouselApi, setInnerCarouselApi] = useState<CarouselApi | null>(
    null,
  );

  useEffect(() => {
    if (innerCarouselApi && giftId !== null) {
      const onSelect = () => {
        const newIndex = innerCarouselApi.selectedScrollSnap();
        setCurrentImageIndexes((prev) => ({
          ...prev,
          [giftId]: newIndex,
        }));
      };

      innerCarouselApi.on("select", onSelect);

      return () => {
        if (innerCarouselApi) {
          innerCarouselApi.off("select", onSelect);
        }
      };
    }
  }, [innerCarouselApi, giftId]);

  if (giftId === null)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  const hasMessage = filledGiftList[parseInt(giftId)].message;
  const message =
    filledGiftList[parseInt(giftId)].message === ""
      ? "입력된 내용이 없어요"
      : filledGiftList[parseInt(giftId)].message;

  return (
    <div className="h-full">
      <Carousel
        setApi={setInnerCarouselApi}
        className="h-[375px] w-full overflow-hidden"
      >
        <CarouselContent className="flex flex-nowrap">
          {filledGiftList[parseInt(giftId)].imageUrls.map((url, index) => (
            <CarouselItem key={index} className="relative min-w-full h-[375px]">
              <Image
                src={url}
                alt={`image_${index}`}
                layout="fill"
                objectFit="cover"
                className="pointer-events-none"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-[12px] right-[12px] h-[23px] rounded-[40px] px-[10px] py-1 bg-white/70 text-center">
          <p className="text-[10px] text-gray-600 tracking-[2px]">
            {currentImageIndexes[parseInt(giftId)] + 1}/
            {filledGiftList[parseInt(giftId)].imageUrls.length}
          </p>
        </div>
      </Carousel>

      <div className="flex flex-col gap-4 my-[18px] px-4">
        <div className="flex flex-col gap-[2px]">
          <p className="text-xs text-gray-600">선물을 고른 이유</p>
          <p className={`text-[15px] ${!hasMessage ? "text-gray-300" : ""}`}>
            {message}
          </p>
        </div>
        <LinkButton linkUrl={filledGiftList[parseInt(giftId)].purchaseUrl} />
      </div>
    </div>
  );
};

export default Page;
