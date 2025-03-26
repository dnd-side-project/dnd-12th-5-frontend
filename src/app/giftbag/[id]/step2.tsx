"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Chip from "@/components/giftbag/Chip";
import DetailGiftBox from "@/components/giftbag/DetailGiftBox";
import ReceiveGiftList from "@/components/giftbag/ReceiveGiftList";
import { Button } from "@/components/ui/button";

import {
  useGiftAnswerStore,
  useIsOpenDetailGiftBoxStore,
  useIsUploadAnswerStore,
} from "@/stores/giftbag/useStore";
import { Step2Props } from "@/types/giftbag/types";
import { RESPONSE_TAGS } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";

const Step2 = ({ gifts, giftResultData, isCompleted }: Step2Props) => {
  const router = useRouter();
  const { id: link } = useParams() as { id: string };

  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();
  const { answers } = useGiftAnswerStore();
  const { isUploadedAnswer, setIsUploadedAnswer } = useIsUploadAnswerStore();

  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setIsUploadedAnswer(true);
    }
  }, [isCompleted, setIsUploadedAnswer]);

  const mappedAnswers = giftResultData
    ? giftResultData.reduce(
        (acc, gift) => ({
          ...acc,
          [gifts.findIndex((g) => g.id === gift.id)]: RESPONSE_TAGS.indexOf(
            gift.responseTag,
          ),
        }),
        {} as Record<number, number>,
      )
    : answers;

  const answeredCount = Object.keys(mappedAnswers).length;
  const chipText =
    answeredCount > 0
      ? `답변을 입력한 선물박스 ${answeredCount}개`
      : "선물을 하나씩 열어볼까요?";

  useEffect(() => {
    if (answeredCount === gifts.length) setIsAnswered(true);
  }, [answeredCount, mappedAnswers, gifts.length]);

  useEffect(() => {
    if (isAnswered) {
      toast({
        title: "모든 선물에 답변이 완료되었습니다!",
        description: "이제 답변을 전송할 수 있어요 🎁",
      });
    }
  }, [isAnswered]);

  const submitGiftResponses = async () => {
    const requestBody = {
      bundleId: sessionStorage.getItem("receiveGiftBagId"),
      gifts: gifts.map((gift, index) => ({
        giftId: gift.id,
        responseTag: RESPONSE_TAGS[mappedAnswers[index] ?? 0],
      })),
    };

    try {
      const response = await fetch(
        `/api/v1/responses/bundles/${link}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw new Error("답변 제출에 실패했습니다.");
      }
      setIsUploadedAnswer(true);
      router.push(`/giftbag/${link}?step=3`);
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="relative bg-pink-50 overflow-hidden h-full">
      {isOpenDetailGiftBox ? (
        <DetailGiftBox giftList={gifts} mappedAnswers={mappedAnswers} />
      ) : (
        <div className="h-[calc(100%-113px)] flex flex-col justify-center items-center mt-[45px]">
          <div className="absolute top-4">
            <Chip text={chipText} width="176px" />
          </div>
          <div>
            <ReceiveGiftList
              giftList={gifts}
              onClick={() => setIsOpenDetailGiftBox(true)}
            />
          </div>
          <div className="absolute bottom-4 w-full px-4">
            <Button
              size="lg"
              onClick={submitGiftResponses}
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
