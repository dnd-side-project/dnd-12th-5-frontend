"use client";

import { useSelectedBagStore } from "@/stores/bundle/useStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { BUNDLE_IMAGE_PATHS } from "@/constants/constants";

const SelectedBundle = () => {
  const { selectedBagIndex } = useSelectedBagStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex h-[224px] w-[206px] items-center justify-center">
      {!hydrated ? (
        <Loading />
      ) : (
        <Image
          src={BUNDLE_IMAGE_PATHS[selectedBagIndex % BUNDLE_IMAGE_PATHS.length]}
          alt={`Gift Bag ${selectedBagIndex}`}
          className="h-full w-full"
          width="200"
          height="200"
        />
      )}
    </div>
  );
};

export default SelectedBundle;
