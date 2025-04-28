import React from "react";

import { ReceiveGiftBox } from "@/types/bundle/types";

const CarouselNavigator = ({
  giftList,
  currentCarousel,
}: {
  giftList: ReceiveGiftBox[];
  currentCarousel: number;
}) => {
  return (
    <div className="flex h-4 flex-row items-center gap-2">
      {giftList.map((_, index) => {
        return (
          <p
            className={`h-[6px] w-[6px] rounded-full ${
              currentCarousel === index + 1 ? "bg-pink-500" : "bg-gray-300"
            }`}
            key={index}
          ></p>
        );
      })}
    </div>
  );
};

export default CarouselNavigator;
