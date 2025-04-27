"use client";

import RightArrowIcon from "/public/icons/arrow_right_small.svg";
import TrashIcon from "/public/icons/trash_icon.svg";

import Card from "@/components/common/Card";
import { Icon } from "@/components/common/Icon";
import { Button } from "@/components/ui/button";
import { useEditBoxStore, useGiftStore } from "@/stores/gift-upload/useStore";

import { useRouter } from "next/navigation";

const GiftThumbnailList = () => {
  const { giftBoxes } = useGiftStore();
  const filledGiftBoxes = giftBoxes.filter((giftBox) => giftBox.filled);
  const router = useRouter();

  const { setIsBoxEditing } = useEditBoxStore();

  const handleGiftClick = (index: number) => {
    setIsBoxEditing(true);
    router.push(`/gift-upload?index=${index}`);
  };

  return (
    <div className="mb-5 mt-[26px] px-5">
      {filledGiftBoxes.map((giftBox, index) => (
        <div
          className={`flex items-center justify-between ${index !== filledGiftBoxes.length - 1 && "border-b-[1px] border-gray-100"} ${index === filledGiftBoxes.length - 1 && "pb-0"} pb-3 pt-3`}
          key={index}
        >
          <div className="flex items-center gap-2">
            <Card
              img={giftBox.imgUrls[0]}
              size="small"
              type="gift"
              noHoverStyle
              noActiveStyle
              noCursorPointerStyle
            />
            <div className="flex items-center gap-1">
              <Button variant="ghost" onClick={() => handleGiftClick(index)}>
                <p>{giftBox.name}</p>
                <Icon src={RightArrowIcon} alt="rightArrowIcon" />
              </Button>
            </div>
          </div>
          <Button variant="ghost" className="w-5">
            <Icon src={TrashIcon} alt="trashButton" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default GiftThumbnailList;
