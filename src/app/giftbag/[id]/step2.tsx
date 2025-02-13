"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Chip from "@/components/giftbag/Chip";
import DetailGiftBox from "@/components/giftbag/DetailGiftBox";
import ReciveGiftList from "@/components/giftbag/ReciveGiftList";
import { Button } from "@/components/ui/button";
import {
  useGiftAnswerStore,
  useIsOpenDetailGiftBoxStore,
} from "@/stores/giftbag/useStore";
import { ReciveGiftBox } from "@/types/giftbag/types";

const Step2 = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const { isOpenDetailGiftBox, setIsOpenDetailGiftBox } =
    useIsOpenDetailGiftBoxStore();

  const handleOnclick = () => {
    //api 추가
    router.push(`/giftbag/${id}?step=3`);
  };

  const [isAnswered, setIsAnswered] = useState(false);

  const openGiftBox = () => {
    setIsOpenDetailGiftBox(true);
  };

  const gifts: ReciveGiftBox[] = [
    {
      name: "휴대폰 케이스",
      message: "",
      imageUrls: ["/img/gift_1.jpg"],
    },
    {
      name: "텀블러",
      message:
        "글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글",
      imageUrls: ["/img/gift_2.jpg"],
    },
    {
      name: "신발",
      message: "달콤한 하루 보내!",
      imageUrls: [
        "/img/gift_3_1.jpg",
        "/img/gift_3_2.jpg",
        "/img/gift_3_3.jpg",
      ],
    },
  ];

  const answers = useGiftAnswerStore((state) => state.answers);
  const answeredCount = Object.keys(answers).length;
  const chipText =
    answeredCount > 0
      ? `답변을 입력한 선물박스 ${answeredCount}개`
      : "선물을 하나씩 열어볼까요?";

  useEffect(() => {
    if (answeredCount === gifts.length) setIsAnswered(true);
  }, [answers]);

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
            <ReciveGiftList giftList={gifts} onClick={openGiftBox} />
          </div>
          <div className="absolute bottom-4 w-full px-4">
            <Button size="lg" onClick={handleOnclick} disabled={!isAnswered}>
              답변 전송하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2;
