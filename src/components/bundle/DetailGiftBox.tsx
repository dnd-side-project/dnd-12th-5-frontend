"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import CarouselNavigator from "../common/CarouselNavigator";
import ImageCarouselButton from "../common/ImageCarouselButton";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { useSelectedGiftBoxStore } from "@/stores/bundle/useStore";
import { DetailGiftBoxProps } from "@/types/components/types";

import ImageCarouselViewer from "./ImageCarouselViewer";
import ReceiveAnswerChipList from "./ReceiveAnswerChipList";

const DetailGiftBox = ({ giftList, mappedAnswers }: DetailGiftBoxProps) => {
  const { selectedGiftIndex } = useSelectedGiftBoxStore();

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    if (carouselApi && selectedGiftIndex !== null) {
      carouselApi.scrollTo(selectedGiftIndex, true);
      setCurrentCarousel(selectedGiftIndex + 1);
    }

    if (carouselApi) {
      carouselApi.on("select", () => {
        setCurrentCarousel(carouselApi.selectedScrollSnap() + 1);
      });
    }
  }, [carouselApi, selectedGiftIndex]);

  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const openImageViewer = (images: string[]) => {
    setImages(images);
    setImageViewerOpen(true);
  };

  return (
    <div className="flex h-fit flex-col items-center justify-center gap-16 pt-8">
      <div className="flex flex-col items-center justify-center gap-6">
        <CarouselNavigator items={giftList} currentIndex={currentCarousel} />
        <Carousel className="w-[304px]" setApi={setCarouselApi}>
          <CarouselContent className="gap-7 pb-0">
            {giftList.map((gift, giftIndex) => {
              return (
                <CarouselItem
                  key={giftIndex}
                  className="flex h-[379px] w-[304px] flex-col rounded-[22px] bg-white"
                >
                  <div
                    onClick={() => openImageViewer(gift.imageUrls)}
                    className="relative -mx-4 h-[236px] w-[304px] cursor-pointer hover:opacity-90"
                  >
                    <Image
                      src={gift.imageUrls[0]}
                      alt="gift-thumbnail"
                      fill
                      className="rounded-t-[22px] object-cover"
                    />
                    <div className="absolute bottom-3 right-3">
                      <ImageCarouselButton />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-[10px]">
                    <p className="text-base font-semibold text-gray-500">
                      {gift.name}
                    </p>
                    <p className="text-[13px] tracking-[-0.13px]">
                      {gift.message}
                    </p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
      {giftList.length > 0 && currentCarousel > 0 && (
        <ReceiveAnswerChipList
          mappedAnswers={mappedAnswers}
          giftIndex={currentCarousel - 1}
          carouselApi={carouselApi}
          giftListLength={giftList.length}
        />
      )}
      {imageViewerOpen && (
        <ImageCarouselViewer
          images={images}
          onClose={() => setImageViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default DetailGiftBox;
