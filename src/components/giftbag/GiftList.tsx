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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { giftBoxes, updateGiftBox } = useGiftStore();

  const emptyGiftBox = () => {
    if (selectedIndex !== null) {
      updateGiftBox(selectedIndex, {
        name: "",
        reason: "",
        purchase_url: "",
        tag: "",
        filled: false,
        imgUrls: [],
        id: null,
      });
    }
    setSelectedBox(null);
    setSelectedIndex(null);
  };

  const oneOrMoreFilledBox = giftBoxes.filter(
    (box) => box && box.filled,
  ).length;

  return (
    <>
      <TooltipProvider>
        <div className="grid grid-cols-2 h-[396px] grid-rows-[repeat(6,_1fr)]">
          {value.map((box, index) => {
            const hasReason = box?.reason && box?.reason.trim().length > 0;
            const imageSet = hasReason
              ? FILLED_IMAGES.withLetter
              : FILLED_IMAGES.noLetter;
            const imageSrc =
              box?.filled && box.filled
                ? imageSet[index % 2]
                : DEFAULT_IMAGES[index % 2];

            return (
              <Drawer key={index}>
                {box?.filled && box.filled ? (
                  <>
                    <DrawerTrigger
                      onClick={() => {
                        setSelectedBox(giftBoxes[index]);
                        setSelectedIndex(index);
                      }}
                    >
                      <div className="w-[130px] h-[130px] flex justify-center items-center cursor-pointer transition-opacity duration-500 ease-in-out">
                        <Image
                          src={imageSrc}
                          alt={`gift-item-${index}`}
                          className="w-full h-full object-contain hover:opacity-[75%]"
                          width="130"
                          height="130"
                        />
                      </div>
                    </DrawerTrigger>
                    <GiftBoxDrawer
                      handleEmptyButton={emptyGiftBox}
                      box={selectedBox}
                      index={selectedIndex}
                    />
                  </>
                ) : (
                  <div
                    className="w-[130px] h-[130px] flex justify-center items-center cursor-pointer transition-opacity duration-500 ease-in-out"
                    onClick={() => {
                      router.push(`/gift-upload?index=${index}`);
                    }}
                  >
                    {index === 0 && !oneOrMoreFilledBox ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Image
                            src={DEFAULT_IMAGES[index % 2]}
                            alt={`gift-item-${index}`}
                            className="w-full h-full object-contain hover:opacity-[75%]"
                            width="130"
                            height="130"
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
                        width="130"
                        height="130"
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
