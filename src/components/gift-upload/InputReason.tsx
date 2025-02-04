import { useState } from "react";
import { GIFT_SELECT_REASON_MAX_LENGTH } from "@/app/constants/constants";
import CustomTextArea from "./CustomTextArea";
import ChipList from "./ChipList";
import GiftIcon from "../../../public/img/gift_letter_square.svg";
import Image from "next/image";

const InputReason = () => {
  const chipText = [
    "직접 입력",
    "취향 저격",
    "실용적",
    "특별한 의미",
    "트렌드",
  ];

  const chipMessages = [
    "",
    "당신의 취향을 저격할 수 있는 선물일 것 같아요!",
    "매일 쓰면서 저를 떠올려 주세요!",
    "특별한 순간, 특별한 마음을 담아 준비했어요.",
    "지금 가장 핫한 아이템으로 마음을 전합니다.",
  ];

  const [isClicked, setIsClicked] = useState(false);
  const [selectedChipIndex, setSelectedChipIndex] = useState(0);
  const [text, setText] = useState("");

  const handleChipClick = (index: number) => {
    setSelectedChipIndex(index);
    setText(chipMessages[index]);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleClickToEdit = () => {
    setIsClicked(true);
  };

  return (
    <div className="flex flex-col gap-4 h-[240px]">
      <p className="text-[15px] font-medium">
        이 선물을 고른 이유를 적어 함께 전달해볼까요?
      </p>
      <div
        className="h-[208px] w-[343px] rounded-[10px] bg-gray-50 border-[1.4px] border-input px-[14px] py-[15px] flex flex-col gap-3 cursor-pointer"
        onClick={handleClickToEdit}
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
                  selectedChipIndex={selectedChipIndex}
                  onChipClick={handleChipClick}
                />
              </div>
            </div>
            <CustomTextArea
              placeholder="직접 입력해주세요."
              maxLength={GIFT_SELECT_REASON_MAX_LENGTH}
              text={text}
              onTextChange={handleTextChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InputReason;
