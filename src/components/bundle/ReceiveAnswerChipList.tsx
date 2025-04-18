import { CarouselApi } from "../ui/carousel";
import { GIFT_ANSWER_CHIP_TEXTES } from "@/constants/constants";
import {
  useGiftAnswerStore,
  useIsUploadAnswerStore,
} from "@/stores/bundle/useStore";

import ReceiveAnswerChip from "./ReceiveAnswerChip";

const ReceiveAnswerChipList = ({
  mappedAnswers,
  giftIndex,
  carouselApi,
  giftListLength,
}: {
  mappedAnswers: Record<number, number>;
  giftIndex: number;
  carouselApi: CarouselApi;
  giftListLength: number;
}) => {
  const { isUploadedAnswer } = useIsUploadAnswerStore();
  const { setAnswer } = useGiftAnswerStore();

  const handleSelectAnswer = (giftIndex: number, answerIndex: number) => {
    setAnswer(giftIndex, answerIndex);
    if (carouselApi && giftIndex < giftListLength - 1) {
      setTimeout(() => {
        carouselApi.scrollTo(giftIndex + 1);
      }, 400);
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
