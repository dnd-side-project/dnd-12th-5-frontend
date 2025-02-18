"use client";

import { useParams, useRouter } from "next/navigation";

import Chip from "@/components/giftbag/Chip";
import DetailGiftBox from "@/components/giftbag/DetailGiftBox";
import { Button } from "@/components/ui/button";
import {
  useGiftAnswerStore,
  useIsOpenDetailGiftBoxStore,
  useIsUploadAnswerStore,
} from "@/stores/giftbag/useStore";
import { ReceiveGiftBox } from "@/types/giftbag/types";
import { useEffect, useState } from "react";
import ReceiveGiftList from "@/components/giftbag/ReceiveGiftList";

const Step2 = ({ gifts }: { gifts: ReceiveGiftBox[] }) => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();
  const { answers } = useGiftAnswerStore();
  const { isUploadedAnswer, setIsUploadedAnswer } = useIsUploadAnswerStore();

  const openGiftBox = () => {
    setIsOpenDetailGiftBox(true);
  };

  const handleOnclick = () => {
    // TODO: API 통신 추가

    router.push(`/giftbag/${id}?step=3`);
    setIsUploadedAnswer(true);
  };

  const [isAnswered, setIsAnswered] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const chipText =
    answeredCount > 0
      ? `답변을 입력한 선물박스 ${answeredCount}개`
      : "선물을 하나씩 열어볼까요?";

  useEffect(() => {
    if (answeredCount === gifts.length) setIsAnswered(true);
  }, [answeredCount, answers, gifts.length]);

  return (
    <div className="relative bg-pink-50 overflow-hidden h-full">
      {isOpenDetailGiftBox ? (
        <DetailGiftBox giftList={gifts} />
      ) : (
        <div className="h-[calc(100%-113px)] flex flex-col justify-center items-center mt-[45px]">
          <div className="absolute top-4">
            <Chip text={chipText} width="176px" />
          </div>
          <div>
            <ReceiveGiftList giftList={gifts} onClick={openGiftBox} />
          </div>
          <div className="absolute bottom-4 w-full px-4">
            <Button
              size="lg"
              onClick={handleOnclick}
              disabled={isUploadedAnswer || !isAnswered}
            >
              {isUploadedAnswer ? "답변 전송 완료!" : "답변 전송하기"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
