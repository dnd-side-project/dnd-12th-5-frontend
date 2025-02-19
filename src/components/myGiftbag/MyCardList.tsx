"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import Card from "@/components/common/Card";

import { FilledGiftListPreview, MyGiftBagPreview } from "@/types/giftbag/types";

import { DESIGN_TYPE_MAP } from "@/constants/constants";

interface MyCardListProps {
  type?: "design" | "image";
  data: MyGiftBagPreview[] | FilledGiftListPreview[];
  size: "small" | "medium";
}

const MyCardList = ({ type, data, size }: MyCardListProps) => {
  const router = useRouter();
  const params = useParams();
  const giftbagId = params?.giftbagId as string;

  const handleCardClick = (clickedIndex: number) => {
    if (type === "image") {
      router.push(`/giftbag/list/${giftbagId}/${clickedIndex}`);
    } else {
      router.push(`/giftbag/list/${clickedIndex}`);
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
              onClick={() => handleCardClick(item.id)}
            />
          );
        })}
    </div>
  );
};
export default React.memo(MyCardList);
