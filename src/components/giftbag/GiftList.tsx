"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GiftList = () => {
  const router = useRouter();
  const images = ["/img/gift_blank_square.svg", "/img/gift_blank_round.svg"];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 h-[396px] grid-rows-[repeat(6,_1fr)]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-[130px] h-[130px] p-[10px] flex justify-center items-center cursor-pointer"
            onClick={() => router.push("/gift-upload")}
          >
            {index === 0 ? (
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={images[index % 2]}
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
            ) : (
              <Image
                src={images[index % 2]}
                alt={`gift-item-${index}`}
                className="w-full h-full object-contain hover:opacity-[75%]"
                width="110"
                height="110"
              />
            )}
          </div>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default GiftList;
