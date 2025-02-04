"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGiftStore } from "@/stores/gift-upload/useStore";

const GiftList = () => {
  const router = useRouter();
  const { giftBoxes } = useGiftStore();

  const DEFAULT_IMAGES = [
    "/img/gift_blank_square.svg",
    "/img/gift_blank_round.svg",
  ];

  const FILLED_IMAGES = {
    noLetter: [
      "/img/gift_no_letter_square.svg",
      "/img/gift_no_letter_round.svg",
    ],
    withLetter: ["/img/gift_letter_square.svg", "/img/gift_letter_round.svg"],
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 h-[396px] grid-rows-[repeat(6,_1fr)]">
        {giftBoxes.map((box, index) => {
          const hasReason = box.reason.trim().length > 0;
          const imageSet = hasReason
            ? FILLED_IMAGES.withLetter
            : FILLED_IMAGES.noLetter;
          const imageSrc = box.filled
            ? imageSet[index % 2]
            : DEFAULT_IMAGES[index % 2];

          return (
            <div
              key={index}
              className="w-[130px] h-[130px] p-[10px] flex justify-center items-center cursor-pointer transition-opacity duration-500 ease-in-out"
              onClick={() => router.push(`/gift-upload?index=${index}`)}
            >
              <Image
                src={imageSrc}
                alt={`gift-item-${index}`}
                className="w-full h-full object-contain hover:opacity-[75%]"
                width="110"
                height="110"
              />
              {index === 0 && !box.filled && (
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src={DEFAULT_IMAGES[index % 2]}
                      alt={`gift-item-${index}`}
                      className="w-full h-full object-contain hover:opacity-[75%]"
                      width="110"
                      height="110"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    사진으로 간단하게 <br /> 선물박스를 채워볼까요?
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default GiftList;
