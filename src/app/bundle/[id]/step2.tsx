"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Chip from "@/components/bundle/Chip";
import DetailGiftBox from "@/components/bundle/DetailGiftBox";
import ReceiveGiftList from "@/components/bundle/ReceiveGiftList";
import { Button } from "@/components/ui/button";
import { RESPONSE_TAGS } from "@/constants/constants";
import { toast } from "@/hooks/use-toast";
import { usePostBundleAnswersMutation } from "@/queries/usePostBundleAnswersMutation";
import {
  useGiftAnswerStore,
  useIsOpenDetailGiftBoxStore,
} from "@/stores/bundle/useStore";
import { Step2Props } from "@/types/bundle/types";

const Step2 = ({ gifts, giftResultData, isCompleted }: Step2Props) => {
  const router = useRouter();
  const { id: link } = useParams() as { id: string };

  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();
  const { answers, resetAnswers } = useGiftAnswerStore();

  const [isAllAnswered, setIsAllAnswered] = useState(false);

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
    if (answeredCount === gifts.length) setIsAllAnswered(true);
  }, [answeredCount, gifts.length]);

  const queryClient = useQueryClient();
  const { mutateAsync } = usePostBundleAnswersMutation(link);

  const submitGiftResponses = async () => {
    const bundleId = Number(sessionStorage.getItem("receiveBundleId"));
    if (!bundleId) return;

    const requestBody = {
      bundleId,
      gifts: gifts.map((gift, index) => ({
        giftId: gift.id,
        responseTag: RESPONSE_TAGS[mappedAnswers[index] ?? 0],
      })),
    };

    try {
      await mutateAsync(requestBody);
      await queryClient.invalidateQueries({
        queryKey: ["receiveBundle", link],
      });
      router.push(`/bundle/${link}?step=3`);
      resetAnswers();
    } catch {
      toast({
        title: "답변 전송에 실패했어요.",
      });
    }
  };

  const bgColor = isOpenDetailGiftBox ? "bg-gray-100" : "bg-pink-50";

  return (
    <div
      className={`relative h-full overflow-y-auto overflow-x-hidden ${bgColor}`}
      style={{ scrollbarWidth: "none" }}
    >
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
              disabled={isCompleted || !isAllAnswered}
            >
              {isCompleted ? "답변 전송 완료!" : "답변 전송하기"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
