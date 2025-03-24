"use client";

import { useSelectedBagStore } from "@/stores/giftbag/useStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { GIFTBAG_IMAGE_PATHS } from "@/constants/constants";

const SelectedGiftBag = () => {
  const { selectedBagIndex } = useSelectedBagStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="w-[206px] h-[224px] flex justify-center items-center">
      {!hydrated ? (
        <Loading />
      ) : (
        <Image
          src={
            GIFTBAG_IMAGE_PATHS[selectedBagIndex % GIFTBAG_IMAGE_PATHS.length]
          }
          alt={`Gift Bag ${selectedBagIndex}`}
          className="w-full h-full"
          width="200"
          height="200"
        />
      )}
    </div>
  );
};

export default SelectedGiftBag;
