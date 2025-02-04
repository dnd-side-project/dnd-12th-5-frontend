import { useState } from "react";
import { GIFT_SELECT_REASON_MAX_LENGTH } from "@/app/constants/constants";
import CustomTextArea from "./CustomTextArea";
import ChipList from "./ChipList";

const InputReason = () => {
  const chipText = [
    "직접 입력",
    "취향 저격",
    "실용적",
    "특별한 의미",
    "트렌드",
  ];

  const chipMessages = [
    "", // 0번 인덱스일 때는 빈 문자열로 두어 사용자가 자유롭게 입력할 수 있도록
    "당신의 취향을 저격할 수 있는 선물일 것 같아요!",
    "매일 쓰면서 저를 떠올려 주세요!",
    "특별한 순간, 특별한 마음을 담아 준비했어요.",
    "지금 가장 핫한 아이템으로 마음을 전합니다.",
  ];

  const [selectedChipIndex, setSelectedChipIndex] = useState(0);
  const [text, setText] = useState("");

  const handleChipClick = (index: number) => {
    setSelectedChipIndex(index);
    setText(chipMessages[index]); // 칩을 클릭하면 해당 메시지를 텍스트에 설정
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value); // 사용자가 직접 입력할 수 있도록 텍스트 상태 관리
  };

  return (
    <div className="flex flex-col gap-4 h-[240px]">
      <p className="text-[15px] font-[500]">
        이 선물을 고른 이유를 적어 함께 전달해볼까요?
      </p>
      <div className="h-[208px] w-[343px] rounded-[10px] bg-gray-50 border-[1.4px] border-input px-[14px] py-[15px] flex flex-col gap-3">
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
      </div>
    </div>
  );
};

export default InputReason;
