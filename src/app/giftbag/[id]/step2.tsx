"use client";

import Chip from "@/components/giftbag/Chip";
import DetailGiftBox from "@/components/giftbag/DetailGiftBox";
import ReciveGiftList from "@/components/giftbag/ReciveGiftList";
import { Button } from "@/components/ui/button";
import { ReciveGiftBox } from "@/types/giftbag/types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
//import { useState } from "react";

const Step2 = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isOpenGiftBox, setIsOpenGiftBox] = useState(false);

  const handleOnclick = () => {
    //api 추가
    router.push(`/giftbag/${id}?step=3`);
  };

  //const [isAnswered, setIsAnswered] = useState(true);

  const openGiftBox = () => {
    setIsOpenGiftBox(true);
  };

  const gifts: ReciveGiftBox[] = [
    {
      name: "향수",
      message: "",
      imageUrls: ["/img/KakaoTalk_20250210_165219597.jpg"],
    },
    {
      name: "초콜릿",
      message:
        "글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글자수가최대일때테스트글",
      imageUrls: ["/img/KakaoTalk_20250210_165219597.jpg"],
    },
    {
      name: "초콜릿",
      message: "달콤한 하루 보내!",
      imageUrls: [
        "/img/KakaoTalk_20250210_165219597.jpg",
        "/img/KakaoTalk_20250210_165219597_01.jpg",
        "/img/KakaoTalk_20250210_165219597_02.jpg",
      ],
    },
  ];

  return (
    <div className="relative flex flex-col bg-pink-50 justify-center items-center py-[10px] px-4 h-full">
      {isOpenGiftBox ? (
        <>
          <DetailGiftBox giftList={gifts} />
        </>
      ) : (
        <>
          <div className="absolute top-4">
            <Chip text="선물을 하나씩 열어볼까요?" width="176px" />
          </div>
          <div className="-mt-[120px]">
            <ReciveGiftList giftList={gifts} onClick={openGiftBox} />
          </div>
          <div className="absolute bottom-4 w-full px-4">
            <Button size="lg" onClick={handleOnclick} disabled={false}>
              답변 전송하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Step2;
