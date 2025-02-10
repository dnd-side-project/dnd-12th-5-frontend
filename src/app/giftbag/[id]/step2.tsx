"use client";

import Chip from "@/components/giftbag/Chip";
import ReciveGiftList from "@/components/giftbag/ReciveGiftList";
import { Button } from "@/components/ui/button";
import { ReciveGiftBox } from "@/types/giftbag/types";
import { useParams, useRouter } from "next/navigation";
//import { useState } from "react";

const Step2 = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const handleOnclick = () => {
    //api 추가
    router.push(`/giftbag/${id}?step=3`);
  };

  //const [isAnswered, setIsAnswered] = useState(true);

  const gifts: ReciveGiftBox[] = [
    {
      name: "향수",
      message: "",
      imageUrls: ["https://example.com/perfume1.jpg"],
    },
    {
      name: "초콜릿",
      message: "달콤한 하루 보내!",
      imageUrls: ["https://example.com/chocolate.jpg"],
    },
    {
      name: "초콜릿",
      message: "달콤한 하루 보내!",
      imageUrls: ["https://example.com/chocolate.jpg"],
    },
    {
      name: "초콜릿",
      message: "달콤한 하루 보내!",
      imageUrls: ["https://example.com/chocolate.jpg"],
    },
  ];

  return (
    <div className="relative flex flex-col bg-pink-50 justify-center items-center py-[10px] px-4 h-full">
      <div className="absolute top-4">
        <Chip text="선물을 하나씩 열어볼까요?" width="176px" />
      </div>
      <div className="-mt-[120px]">
        <ReciveGiftList giftList={gifts} />
      </div>
      <div className="absolute bottom-4 w-full px-4">
        <Button size="lg" onClick={handleOnclick} disabled={false}>
          답변 전송하기
        </Button>
      </div>
    </div>
  );
};

export default Step2;
