"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import CarouselNavigator from "../common/CarouselNavigator";
import { Icon } from "../common/Icon";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

import CloseIcon from "/public/icons/close_gray_50.svg";

import { ImageCarouselViewerProps } from "@/types/components/types";

const ImageCarouselViewer = ({ images, onClose }: ImageCarouselViewerProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.scrollTo(0);
      setCurrentIndex(1);
      carouselApi.on("select", () => {
        setCurrentIndex(carouselApi.selectedScrollSnap() + 1);
      });
    }
  }, [carouselApi]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 text-white"
      >
        <Icon src={CloseIcon} alt="close" size="large" />
      </button>
      <div className="relative w-full overflow-hidden px-4">
        <Carousel setApi={setCarouselApi}>
          <CarouselContent>
            {images.map((url, idx) => (
              <CarouselItem
                key={idx}
                className="flex w-full flex-shrink-0 items-center justify-center"
              >
                <div className="relative max-h-[80vh] w-auto">
                  <Image
                    src={url}
                    alt={`image_${idx}`}
                    layout="intrinsic"
                    width={430}
                    height={500}
                    className="object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
        <CarouselNavigator
          items={images}
          currentIndex={currentIndex}
          activeColorClass="bg-white"
        />
      </div>
    </div>
  );
};

export default ImageCarouselViewer;
