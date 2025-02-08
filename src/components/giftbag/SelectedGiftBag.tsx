"use client";

import { useStore } from "@/stores/giftbag/useStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const SelectedGiftBag = () => {
  const { selectedBagIndex } = useStore();
  const [hydrated, setHydrated] = useState(false);

  const imagePaths = [
    "/img/giftBag_red.svg",
    "/img/giftBag_pink.svg",
    "/img/giftBag_blue.svg",
    "/img/giftBag_yellow.svg",
    "/img/giftBag_green.svg",
  ];

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="w-[260px] h-[260px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-[206px] h-[224px]">
      <Image
        src={imagePaths[selectedBagIndex % imagePaths.length]}
        alt={`Gift Bag ${selectedBagIndex}`}
        className="w-full h-full"
        width="200"
        height="200"
      />
    </div>
  );
};

export default SelectedGiftBag;
