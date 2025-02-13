"use client";

import { useStore } from "@/stores/giftbag/useStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";

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
    return <Loading width={"260px"} height={"260px"} />;
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
