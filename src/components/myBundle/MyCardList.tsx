"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import Card from "@/components/common/Card";
import { DESIGN_TYPE_MAP } from "@/constants/constants";
import { useSelectedBagStore } from "@/stores/bundle/useStore";
import { FilledGiftPreview, MyBundlePreview } from "@/types/bundle/types";
import { MyCardListProps } from "@/types/components/types";

const MyCardList = ({ type, data, size, isSelectable }: MyCardListProps) => {
  const router = useRouter();
  const { bundleId } = useParams() as { bundleId: string };

  const { selectedBagIndex, setSelectedBagIndex } = useSelectedBagStore();

  const handleCardClick = (clickedId: number) => {
    if (type === "gift") {
      router.push(`/my-bundles/${bundleId}/${clickedId}`);
    } else if (type === "bundle") {
      if (isSelectable) setSelectedBagIndex(clickedId);
      else router.push(`/my-bundles/${clickedId}`);
    }
  };

  const isFilledGiftPreview = (
    item: MyBundlePreview | FilledGiftPreview | string,
  ): item is FilledGiftPreview => {
    return typeof item === "object" && item !== null && "thumbnail" in item;
  };

  const isMyBundlePreview = (
    item: MyBundlePreview | FilledGiftPreview | string,
  ): item is MyBundlePreview => {
    return (
      typeof item === "object" &&
      item !== null &&
      "isRead" in item &&
      "designType" in item
    );
  };

  return (
    <div className="flex gap-[13px] whitespace-nowrap">
      {data &&
        data.map((item, index) => {
          const bundleDesignURL =
            isMyBundlePreview(item) && DESIGN_TYPE_MAP[item.designType];

          return (
            <Card
              key={index}
              type={type}
              size={size}
              isRead={isMyBundlePreview(item) ? item.isRead : undefined}
              isActive={
                !isMyBundlePreview(item) &&
                !isFilledGiftPreview(item) &&
                index === selectedBagIndex
              }
              img={
                typeof item === "string"
                  ? item
                  : isFilledGiftPreview(item)
                    ? item.thumbnail
                    : bundleDesignURL || ""
              }
              onClick={() =>
                handleCardClick(
                  isMyBundlePreview(item) || isFilledGiftPreview(item)
                    ? item.id
                    : index,
                )
              }
            />
          );
        })}
    </div>
  );
};
export default React.memo(MyCardList);
