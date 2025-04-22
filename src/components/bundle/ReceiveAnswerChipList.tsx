import { GIFT_ANSWER_CHIP_TEXTES } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import {
  useGiftAnswerStore,
  useIsOpenDetailGiftBoxStore,
  useIsUploadAnswerStore,
} from "@/stores/bundle/useStore";
import { ReceiveAnswerChipListProps } from "@/types/bundle/types";

import ReceiveAnswerChip from "./ReceiveAnswerChip";

const ReceiveAnswerChipList = ({
  mappedAnswers,
  giftIndex,
  carouselApi,
  giftListLength,
}: ReceiveAnswerChipListProps) => {
  const { isUploadedAnswer } = useIsUploadAnswerStore();
  const { setAnswer } = useGiftAnswerStore();
  const { setIsOpenDetailGiftBox } = useIsOpenDetailGiftBoxStore();

  const handleSelectAnswer = (giftIndex: number, answerIndex: number) => {
    setAnswer(giftIndex, answerIndex);

    const updatedAnswers = {
      ...mappedAnswers,
      [giftIndex]: answerIndex,
    };
    const allAnswered = Object.keys(updatedAnswers).length === giftListLength;

    if (carouselApi && giftIndex < giftListLength - 1) {
      setTimeout(() => {
        carouselApi.scrollTo(giftIndex + 1);
      }, 400);
    }

    if (allAnswered && giftIndex === giftListLength - 1) {
      setTimeout(() => {
        setIsOpenDetailGiftBox(false);
        toast({
          title: "답변이 저장되었어요!",
        });
      }, 500);
    }
  };

  return (
    <div className="flex w-full flex-col gap-[22px] px-[19px] pb-[19px]">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500">선물에 대한 답변을 선택해주세요</p>
        <div className="grid grid-cols-2 gap-[9px]">
          {GIFT_ANSWER_CHIP_TEXTES.map((answer, index) => (
            <ReceiveAnswerChip
              key={index}
              text={answer}
              isActive={mappedAnswers[giftIndex] === index}
              onClick={() => handleSelectAnswer(giftIndex, index)}
              disabled={isUploadedAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceiveAnswerChipList;
