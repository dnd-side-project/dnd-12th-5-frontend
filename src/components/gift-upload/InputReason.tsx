"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ChipList from "./ChipList";
import CustomTextArea from "./CustomTextArea";
import { GIFT_SELECT_REASON_MAX_LENGTH } from "@/app/constants/constants";
import GiftIcon from "../../../public/img/gift_letter_square.svg";
import { useGiftStore, useTagIndexStore } from "@/stores/gift-upload/useStore";

const chipText = ["직접 입력", "취향 저격", "실용적", "특별한 의미", "트렌드"];
const chipMessages = [
  "",
  "당신의 취향을 저격할 수 있는 선물일 것 같아요!",
  "매일 쓰면서 저를 떠올려 주세요!",
  "특별한 순간, 특별한 마음을 담아 준비했어요.",
  "지금 가장 핫한 아이템으로 마음을 전합니다.",
];

interface InputReasonProps {
  value?: string;
  onReasonChange: (text: string) => void;
  onTagChange: (tag: string) => void;
  giftBoxIndex: number;
}

const InputReason = ({
  value = "",
  onReasonChange,
  onTagChange,
  giftBoxIndex,
}: InputReasonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { setSelectedTagIndex } = useTagIndexStore();
  const [text, setText] = useState(value);
  const [tagIndex, setTagIndex] = useState(0);

  const { giftBoxes } = useGiftStore();

  const selectedTagIndex = giftBoxes[giftBoxIndex].tagIndex || tagIndex;

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    setSelectedTagIndex(selectedTagIndex);
  }, [tagIndex]);

  const handleChipClick = (index: number) => {
    setTagIndex(index);
    setSelectedTagIndex(index);
    const newText = chipMessages[index];
    setText(newText);
    onReasonChange(newText);
    onTagChange(chipText[index]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] font-medium">
        이 선물을 고른 이유를 적어 함께 전달해볼까요?
      </p>
      <div
        className="h-[208px] rounded-[10px] bg-gray-50 border-[1.4px] border-input px-[14px] py-[15px] flex flex-col gap-3 cursor-pointer"
        onClick={() => setIsClicked(true)}
      >
        {!isClicked ? (
          <div className="m-auto">
            <div className="flex justify-center items-center">
              <Image src={GiftIcon} alt="giftIcon" width={48} height={48} />
            </div>
            <p className="text-center text-sm text-gray-300 mt-2">
              클릭 후, 선물을 고른 이유를 적어주세요
              <br />
              선물박스에 쪽지가 추가됩니다.
            </p>
          </div>
        ) : (
          <>
            <div
              className="w-full overflow-x-auto flex items-center"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="min-w-max">
                <ChipList
                  chipText={chipText}
                  selectedChipIndex={selectedTagIndex}
                  onChipClick={handleChipClick}
                />
              </div>
            </div>
            <CustomTextArea
              placeholder="직접 입력해주세요."
              text={text}
              onTextChange={(e) => onReasonChange(e.target.value)}
              maxLength={GIFT_SELECT_REASON_MAX_LENGTH}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputReason;
