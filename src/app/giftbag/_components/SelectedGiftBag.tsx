"use client";

import Image from "next/image";
import { useStore } from "../_stores/useStore";

const SelectedGiftBag = () => {
  const { selectedBagIndex } = useStore();
  const imagePaths = [
    "/img/giftBag_red.svg",
    "/img/giftBag_pink.svg",
    "/img/giftBag_blue.svg",
    "/img/giftBag_yellow.svg",
    "/img/giftBag_green.svg",
  ];

  return (
    <div className="w-[260px] h-[260px] mt-10 py-4 px-7">
      <Image
        src={imagePaths[selectedBagIndex % imagePaths.length]}
        alt={`Gift Bag ${selectedBagIndex}`}
        className="w-full h-full object-cover"
        width="200"
        height="200"
      />
    </div>
  );
};

export default SelectedGiftBag;
