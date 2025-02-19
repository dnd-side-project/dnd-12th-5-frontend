"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/common/Card";

import { FilledGiftListPreview, MyGiftBagPreview } from "@/types/giftbag/types";

import { DESIGN_TYPE_MAP } from "@/constants/constants";

interface MyCardListProps {
  type?: "design" | "image";
  data: MyGiftBagPreview[] | FilledGiftListPreview[];
  size: "small" | "medium";
  giftbagIndex?: string;
}

const MyCardList = ({ type, data, size, giftbagIndex }: MyCardListProps) => {
  const router = useRouter();

  const handleCardClick = (index: number) => {
    if (type === "image") {
      router.push(`/giftbag/list/${giftbagIndex}/${index}`);
    } else {
      router.push(`/giftbag/list/${index}`);
    }
  };

  const hasThumbnailField = (
    item: MyGiftBagPreview | FilledGiftListPreview,
  ): item is FilledGiftListPreview => {
    return "thumbnail" in item;
  };

  return (
    <div className="flex gap-[12px] whitespace-nowrap">
      {data &&
        data.map((item, index) => {
          const giftBagDesignURL =
            "designType" in item && DESIGN_TYPE_MAP[item.designType];

          return (
            <Card
              key={index}
              type={type}
              size={size}
              img={
                hasThumbnailField(item)
                  ? item.thumbnail
                  : giftBagDesignURL || ""
              }
              onClick={() => handleCardClick(index)}
            />
          );
        })}
    </div>
  );
};
export default React.memo(MyCardList);
