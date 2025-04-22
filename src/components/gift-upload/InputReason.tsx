"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import GiftIcon from "../../../public/img/gift_letter_square.svg";
import {
  GIFT_SELECT_REASON_MAX_LENGTH,
  REASON_CHIP_MESSAGES,
  REASON_CHIP_TEXTES,
} from "@/constants/constants";
import {
  useEditBoxStore,
  useGiftStore,
  useTagIndexStore,
} from "@/stores/gift-upload/useStore";
import { InputReasonProps } from "@/types/components/types";

import ChipList from "./ChipList";
import CustomTextArea from "./CustomTextArea";

const InputReason = ({
  value,
  onReasonChange,
  onTagChange,
  giftBoxIndex,
}: InputReasonProps) => {
  const { selectedTagIndex, setSelectedTagIndex } = useTagIndexStore();
  const { isBoxEditing } = useEditBoxStore();
  const [inputValue, setInputValue] = useState(value);

  const { giftBoxes } = useGiftStore();
  const [isClicked, setIsClicked] = useState(giftBoxes[giftBoxIndex].filled);
  const [tagIndex, setTagIndex] = useState(giftBoxes[giftBoxIndex].tagIndex);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setSelectedTagIndex(tagIndex);
  }, [setSelectedTagIndex, tagIndex]);

  useEffect(() => {
    if (giftBoxes[giftBoxIndex].filled) setIsClicked(true);
  }, [giftBoxIndex, giftBoxes, isBoxEditing]);

  useEffect(() => {
    if (isBoxEditing) {
      const currentTagIndex = giftBoxes[giftBoxIndex].tagIndex;
      setTagIndex(currentTagIndex);
      setSelectedTagIndex(currentTagIndex);
    }
  }, [isBoxEditing, giftBoxIndex, giftBoxes, setSelectedTagIndex]);

  const handleChipClick = (index: number) => {
    setTagIndex(index);
    setSelectedTagIndex(index);
    const newText = REASON_CHIP_MESSAGES[index];
    setInputValue(newText);
    onReasonChange(newText);
    onTagChange(REASON_CHIP_TEXTES[index]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputValue(newText);
    onReasonChange(newText);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] font-medium">
        이 선물을 고른 이유를 적어 함께 전달해볼까요?
      </p>
      <div
        className="flex h-[208px] cursor-pointer flex-col gap-3 rounded-[10px] border-[1.4px] bg-gray-50 px-[14px] py-[15px]"
        onClick={() => setIsClicked(true)}
      >
        {!isClicked ? (
          <div className="m-auto">
            <div className="flex items-center justify-center">
              <Image src={GiftIcon} alt="giftIcon" width={48} height={48} />
            </div>
            <p className="mt-2 text-center text-sm text-gray-300">
              클릭 후, 선물을 고른 이유를 적어주세요
              <br />
              선물박스에 쪽지가 추가됩니다.
            </p>
          </div>
        ) : (
          <>
            <div
              className="flex w-full items-center overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="min-w-max">
                <ChipList
                  chipText={REASON_CHIP_TEXTES}
                  selectedChipIndex={selectedTagIndex}
                  onChipClick={handleChipClick}
                />
              </div>
            </div>
            <CustomTextArea
              placeholder="직접 입력해주세요."
              text={inputValue}
              onTextChange={handleInputChange}
              maxLength={GIFT_SELECT_REASON_MAX_LENGTH}
              disable={tagIndex !== 0}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputReason;
