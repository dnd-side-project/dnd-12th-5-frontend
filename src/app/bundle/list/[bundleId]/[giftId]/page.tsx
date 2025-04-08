"use client";

import { useState, useEffect, Key } from "react";
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

import { useGiftNameStore } from "@/stores/bundle/useStore";
import { useGiftDetail } from "@/hooks/api/useGiftDetail";

const Page = () => {
  const { giftId, bundleId } = useParams() as {
    giftId: string;
    bundleId: string;
  };

  const { data } = useGiftDetail(parseInt(giftId), parseInt(bundleId));

  const { name, message, purchaseUrl, thumbnail, imageUrls } = data || {
    name: "",
    message: "",
    purchaseUrl: "",
    thumbnail: "",
    combinedImages: [],
  };

  // 하나의 이미지 배열로 관리
  const combinedImages = [
    thumbnail,
    ...(Array.isArray(imageUrls) ? imageUrls : []),
  ];

  const { setGiftName } = useGiftNameStore();

  useEffect(() => {
    setGiftName(name);
  }, [giftId, name, setGiftName]);

  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: number]: number;
  }>({
    [parseInt(giftId)]: 0,
  });

  const [innerCarouselApi, setInnerCarouselApi] = useState<CarouselApi | null>(
    null,
  );

  useEffect(() => {
    if (innerCarouselApi && giftId !== null) {
      const onSelect = () => {
        const newIndex = innerCarouselApi.selectedScrollSnap();
        setCurrentImageIndexes((prev) => ({
          ...prev,
          [parseInt(giftId)]: newIndex,
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
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );

  const hasMessage = message.length > 0;
  const filteredMessage = !hasMessage ? "입력된 내용이 없어요" : message;

  return (
    <div className="h-full">
      <Carousel
        setApi={setInnerCarouselApi}
        className="h-[375px] w-full overflow-hidden"
      >
        <CarouselContent className="flex flex-nowrap">
          {combinedImages.map((url: string, index: Key | null | undefined) => (
            <CarouselItem key={index} className="relative h-[375px] min-w-full">
              <Image
                src={url || ""}
                alt={`image_${index}`}
                layout="fill"
                style={{ objectFit: "cover" }}
                className="pointer-events-none"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-[12px] right-[12px] h-[23px] rounded-[40px] bg-white/70 px-[10px] py-1 text-center">
          <p className="text-[10px] tracking-[2px] text-gray-600">
            {currentImageIndexes[parseInt(giftId)] !== undefined
              ? currentImageIndexes[parseInt(giftId)] + 1
              : 0}
            /{combinedImages.length}
          </p>
        </div>
      </Carousel>

      <div className="my-[18px] flex flex-col gap-4 px-4">
        <div className="flex flex-col gap-[2px]">
          <p className="text-xs text-gray-600">선물을 고른 이유</p>
          <p className={`text-[15px] ${!hasMessage ? "text-gray-300" : ""}`}>
            {filteredMessage}
          </p>
        </div>
        <LinkButton linkUrl={purchaseUrl} />
      </div>
    </div>
  );
};

export default Page;
