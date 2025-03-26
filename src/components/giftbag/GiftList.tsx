import { useEffect, useState } from "react";
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
import {
  GIFTBOX_DEFAULT_IMAGES,
  GIFTBOX_FILLED_IMAGES,
  GIFTBOX_SHAPE_SEQUENCE,
} from "@/constants/constants";

const GiftList = ({ value }: { value: GiftBox[] }) => {
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

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TooltipProvider>
        <div className="grid grid-cols-2 h-[396px] grid-rows-[repeat(6,_1fr)]">
          {value.map((box, index) => {
            const hasReason = box?.reason && box?.reason.trim().length > 0;

            const shape =
              GIFTBOX_SHAPE_SEQUENCE[index % GIFTBOX_SHAPE_SEQUENCE.length];
            const imageSet = hasReason
              ? GIFTBOX_FILLED_IMAGES.withLetter
              : GIFTBOX_FILLED_IMAGES.noLetter;

            const imageSrc =
              box?.filled && box.filled
                ? shape === "square"
                  ? imageSet[0]
                  : imageSet[1]
                : shape === "square"
                  ? GIFTBOX_DEFAULT_IMAGES[0]
                  : GIFTBOX_DEFAULT_IMAGES[1];

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
                    {index === 0 ? (
                      <Tooltip open={showTooltip}>
                        <TooltipTrigger asChild>
                          <Image
                            src={GIFTBOX_DEFAULT_IMAGES[index % 2]}
                            alt={`gift-item-${index}`}
                            className="w-full h-full object-contain hover:opacity-[75%]"
                            width="130"
                            height="130"
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          align="center"
                          className="bg-white text-black font-nanum -mt-1 py-2 px-4 text-[13px] font-bold border-[1px] border-gray-800"
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
