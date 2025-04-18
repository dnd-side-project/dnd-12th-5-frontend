import Chip from "../common/Chip";
import { CarouselApi } from "../ui/carousel";
import { GIFT_ANSWER_CHIP_TEXTES } from "@/constants/constants";
import {
  useGiftAnswerStore,
  useIsUploadAnswerStore,
} from "@/stores/bundle/useStore";
import { ReceiveGiftBox } from "@/types/bundle/types";

const ReceiveAnswerChipList = ({
  gift,
  mappedAnswers,
  giftIndex,
  carouselApi,
  giftListLength,
}: {
  gift: ReceiveGiftBox;
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
    <div className="my-[18px] flex flex-col gap-[22px]">
      <div className="flex flex-col gap-[10px]">
        <p className="text-xs text-gray-600">{gift.name}</p>
        <p className="text-[15px]">{gift.message}</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-500">선물에 대한 답변을 선택해주세요</p>
        <div className="flex w-[272px] flex-wrap gap-2">
          {GIFT_ANSWER_CHIP_TEXTES.map((answer, index) => (
            <Chip
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
