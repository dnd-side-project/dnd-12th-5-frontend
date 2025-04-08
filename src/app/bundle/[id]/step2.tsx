"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Chip from "@/components/bundle/Chip";
import DetailGiftBox from "@/components/bundle/DetailGiftBox";
import ReceiveGiftList from "@/components/bundle/ReceiveGiftList";
import { Button } from "@/components/ui/button";

import {
  useGiftAnswerStore,
  useIsOpenDetailGiftBoxStore,
  useIsUploadAnswerStore,
} from "@/stores/bundle/useStore";
import { Step2Props } from "@/types/bundle/types";
import { RESPONSE_TAGS } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import { PICKTORY_API } from "@/api/api-url";

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

  const submitGiftResponses = async () => {
    const requestBody = {
      bundleId: sessionStorage.getItem("receiveBundleId"),
      gifts: gifts.map((gift, index) => ({
        giftId: gift.id,
        responseTag: RESPONSE_TAGS[mappedAnswers[index] ?? 0],
      })),
    };

    /** 보따리 풀어보기 api */
    try {
      const response = await fetch(PICKTORY_API.openBundle(link), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "답변 전송에 실패했습니다.",
        });
        throw new Error("답변 전송에 실패했습니다.");
      }
      setIsUploadedAnswer(true);
      router.push(`/bundle/${link}?step=3`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "답변 전송에 실패했습니다.",
      });
    }
  };

  return (
    <div className="relative h-full overflow-hidden bg-pink-50">
      {isOpenDetailGiftBox ? (
        <DetailGiftBox giftList={gifts} mappedAnswers={mappedAnswers} />
      ) : (
        <div className="mt-[45px] flex h-[calc(100%-113px)] flex-col items-center justify-center">
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
