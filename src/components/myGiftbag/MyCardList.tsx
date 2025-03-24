"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import Card from "@/components/common/Card";
import { FilledGiftListPreview, MyGiftBagPreview } from "@/types/giftbag/types";
import { DESIGN_TYPE_MAP } from "@/constants/constants";
import { MyCardListProps } from "@/types/components/types";

const MyCardList = ({ type, data, size }: MyCardListProps) => {
  const router = useRouter();
  const { giftBagId } = useParams() as { giftBagId: string };

  const handleCardClick = (clickedIndex: number) => {
    if (type === "image") {
      router.push(`/giftbag/list/${giftBagId}/${clickedIndex}`);
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
    <div className="flex gap-[13px] whitespace-nowrap">
      {data &&
        data.map((item, index) => {
          const giftBagDesignURL =
            "designType" in item && DESIGN_TYPE_MAP[item.designType];

          return (
            <Card
              key={index}
              type={type}
              size={size}
              isRead={
                "isRead" in item
                  ? (item.isRead as boolean | undefined)
                  : undefined
              }
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
