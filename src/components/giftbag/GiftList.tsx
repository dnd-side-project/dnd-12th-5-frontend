import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GiftBox } from "@/types/giftbag/types";
import { useGiftStore } from "@/stores/gift-upload/useStore";
import GiftBoxDrawer from "../gift-upload/GiftBoxDrawer";
import { Drawer, DrawerTrigger } from "../ui/drawer";

const DEFAULT_IMAGES = [
  "/img/gift_blank_square.svg",
  "/img/gift_blank_round.svg",
];

const FILLED_IMAGES = {
  noLetter: ["/img/gift_no_letter_square.svg", "/img/gift_no_letter_round.svg"],
  withLetter: ["/img/gift_letter_square.svg", "/img/gift_letter_round.svg"],
};

interface GiftListProps {
  value: GiftBox[];
}

const GiftList = ({ value }: GiftListProps) => {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<GiftBox | null>(null);

  const { giftBoxes, updateGiftBox } = useGiftStore();

  const emptyGiftBox = () => {
    const index = giftBoxes.findIndex((box) => box === selectedBox);

    if (index !== -1) {
      updateGiftBox(index, {
        name: "",
        reason: "",
        purchase_url: "",
        tag: "",
        filled: false,
      });
    }
    setSelectedBox(null);
  };

  return (
    <>
      <TooltipProvider>
        <div className="grid grid-cols-2 h-[396px] grid-rows-[repeat(6,_1fr)]">
          {value.map((box, index) => {
            const hasReason = box.reason.trim().length > 0;
            const imageSet = hasReason
              ? FILLED_IMAGES.withLetter
              : FILLED_IMAGES.noLetter;
            const imageSrc = box.filled
              ? imageSet[index % 2]
              : DEFAULT_IMAGES[index % 2];

            return (
              <Drawer key={index}>
                {box.filled ? (
                  <>
                    <DrawerTrigger>
                      <div
                        key={index}
                        className="w-[130px] h-[130px] p-[10px] flex justify-center items-center cursor-pointer transition-opacity duration-500 ease-in-out"
                        onClick={() => {
                          setSelectedBox(box);
                        }}
                      >
                        <Image
                          src={imageSrc}
                          alt={`gift-item-${index}`}
                          className="w-full h-full object-contain hover:opacity-[75%]"
                          width="110"
                          height="110"
                        />
                      </div>
                    </DrawerTrigger>
                    <GiftBoxDrawer
                      handleEmptyButton={emptyGiftBox}
                      box={selectedBox}
                    />
                  </>
                ) : (
                  <div
                    key={index}
                    className="w-[130px] h-[130px] p-[10px] flex justify-center items-center cursor-pointer transition-opacity duration-500 ease-in-out"
                    onClick={() => {
                      router.push(`/gift-upload?index=${index}`);
                    }}
                  >
                    {index === 0 ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            src={DEFAULT_IMAGES[index % 2]}
                            alt={`gift-item-${index}`}
                            className="w-full h-full object-contain hover:opacity-[75%]"
                            width="110"
                            height="110"
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="center"
                          className="bg-white text-black font-nanum -mt-1"
                        >
                          사진으로 간단하게 <br /> 선물박스를 채워볼까요?
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Image
                        src={imageSrc}
                        alt={`gift-item-${index}`}
                        className="w-full h-full object-contain hover:opacity-[75%]"
                        width="110"
                        height="110"
                      />
                    )}
                  </div>
                )}
              </Drawer>
            );
          })}
        </div>
      </TooltipProvider>
    </>
  );
};

export default GiftList;
