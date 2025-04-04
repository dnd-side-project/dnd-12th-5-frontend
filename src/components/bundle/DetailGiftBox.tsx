"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Button } from "../ui/button";
import Chip from "../common/Chip";

import LeftIcon from "/public/icons/arrow_left_large.svg";
import RightIcon from "/public/icons/arrow_right_large.svg";

import { GIFT_ANSWER_CHIP_TEXTES } from "@/constants/constants";
import {
  useGiftAnswerStore,
  useIsUploadAnswerStore,
  useSelectedGiftBoxStore,
} from "@/stores/bundle/useStore";
import { Icon } from "../common/Icon";
import { DetailGiftBoxProps } from "@/types/components/types";

const DetailGiftBox = ({ giftList, mappedAnswers }: DetailGiftBoxProps) => {
  const { setAnswer } = useGiftAnswerStore();
  const { isUploadedAnswer } = useIsUploadAnswerStore();
  const { selectedGiftIndex } = useSelectedGiftBoxStore();

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const imgCarouselApis = useRef<{ [key: number]: CarouselApi | null }>({});
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>(giftList.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {}));

  useEffect(() => {
    if (carouselApi && selectedGiftIndex !== null) {
      carouselApi.scrollTo(selectedGiftIndex, true);
      setCurrentCarousel(selectedGiftIndex + 1);
    } else if (carouselApi) {
      setCurrentCarousel(carouselApi.selectedScrollSnap() + 1);
    }

    if (carouselApi) {
      carouselApi.on("select", () => {
        setCurrentCarousel(carouselApi.selectedScrollSnap() + 1);
      });
    }
  }, [carouselApi, selectedGiftIndex]);

  const handleImageCarouselSelect = (giftIndex: number) => {
    const api = imgCarouselApis.current[giftIndex];
    if (!api) return;

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [giftIndex]: api.selectedScrollSnap(),
    }));
  };

  const handlePrevImage = (giftIndex: number) => {
    const api = imgCarouselApis.current[giftIndex];
    if (api) {
      api.scrollTo(currentImageIndexes[giftIndex] - 1);
    }
  };

  const handleNextImage = (giftIndex: number) => {
    const api = imgCarouselApis.current[giftIndex];
    if (api) {
      api.scrollTo(currentImageIndexes[giftIndex] + 1);
    }
  };

  const handleSelectAnswer = (giftIndex: number, answerIndex: number) => {
    setAnswer(giftIndex, answerIndex);
    if (carouselApi && giftIndex < giftList.length - 1) {
      setTimeout(() => {
        carouselApi.scrollTo(giftIndex + 1);
      }, 400);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Carousel className="w-[304px]" setApi={setCarouselApi}>
        <CarouselContent className="gap-[14px] pb-0">
          {giftList.map((gift, giftIndex) => {
            return (
              <CarouselItem
                key={giftIndex}
                className="bg-white h-[540px] w-[304px] rounded-[18px] flex flex-col overflow-hidden"
              >
                <div className="-mx-4">
                  <Carousel
                    setApi={(api) => {
                      imgCarouselApis.current[giftIndex] = api;
                      api?.on("select", () =>
                        handleImageCarouselSelect(giftIndex),
                      );
                    }}
                    opts={{ watchDrag: false }}
                  >
                    <CarouselContent className="flex">
                      {gift.imageUrls.map((url, index) => {
                        return (
                          <CarouselItem
                            key={index}
                            className="h-[220px] relative"
                          >
                            <Image
                              src={url}
                              alt={`image_${index}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-t-[18px] pointer-events-none"
                            />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    {currentImageIndexes[giftIndex] !== 0 && (
                      <Button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-gray-100 opacity-30 rounded-full hover:opacity-60"
                        onClick={() => handlePrevImage(giftIndex)}
                        disabled={currentImageIndexes[giftIndex] === 0}
                        variant="ghost"
                      >
                        <Icon src={LeftIcon} alt="leftArrow" size="small" />
                      </Button>
                    )}
                    {currentImageIndexes[giftIndex] !==
                      gift.imageUrls.length - 1 && (
                      <Button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 opacity-30 rounded-full bg-gray-100 hover:opacity-60"
                        onClick={() => handleNextImage(giftIndex)}
                        disabled={
                          currentImageIndexes[giftIndex] ===
                          gift.imageUrls.length - 1
                        }
                        variant="ghost"
                      >
                        <Icon src={RightIcon} alt="RightArrow" size="small" />
                      </Button>
                    )}
                    <div className="absolute bottom-2 right-2 w-10 h-[23px] rounded-[40px] px-[10px] py-1 bg-white/70 text-center">
                      <p className="text-[10px] text-gray-600 tracking-[2px]">
                        {currentImageIndexes[giftIndex] + 1}/
                        {gift.imageUrls.length}
                      </p>
                    </div>
                  </Carousel>
                </div>
                <div className="flex flex-col gap-[22px] my-[18px]">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-xs text-gray-600">{gift.name}</p>
                    <p className="text-[15px]">{gift.message}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-500">
                      선물에 대한 답변을 선택해주세요
                    </p>
                    <div className="flex gap-2 flex-wrap w-[272px]">
                      {GIFT_ANSWER_CHIP_TEXTES.map((answer, index) => (
                        <Chip
                          key={index}
                          text={answer}
                          isActive={mappedAnswers[giftIndex] === index}
                          onClick={() => handleSelectAnswer(giftIndex, index)}
                          disabled={isUploadedAnswer}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-2 mt-[17px]">
        {giftList.map((_, index) => {
          return (
            <p
              className={`w-[6px] h-[6px] rounded-full ${
                currentCarousel === index + 1 ? "bg-pink-500" : "bg-gray-300"
              }`}
              key={index}
            ></p>
          );
        })}
      </div>
    </div>
  );
};

export default DetailGiftBox;
