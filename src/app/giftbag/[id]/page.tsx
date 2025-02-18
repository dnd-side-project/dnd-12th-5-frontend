"use client";

import { useSearchParams } from "next/navigation";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { ReceiveGiftBag } from "@/types/giftbag/types";

const Page = () => {
  const searchParams = useSearchParams();
  const step = searchParams ? searchParams.get("step") : null;

  const giftBag: ReceiveGiftBag = {
    delivery_character_type: "CHARACTER_4",
    design_type: "YELLOW",
    status: "PUBLISHED",
    gifts: [
      {
        id: 1234,
        name: "신발",
        message: null,
        imageUrls: [
          "/img/gift_3_1.jpg",
          "/img/gift_3_2.jpg",
          "/img/gift_3_3.jpg",
        ],
        thumbnail: "/img/gift_3_1.jpg",
      },
      {
        id: 12345,
        name: "텀블러",
        message: "안녕~~~",
        imageUrls: ["/img/gift_2.jpg"],
        thumbnail: "/img/gift_2.jpg",
      },
      {
        id: 123,
        name: "휴대폰 케이스",
        message: "안녕~~~ 이건 짱예쁜 휴대폰 케이스임",
        imageUrls: ["/img/gift_1.jpg"],
        thumbnail: "/img/gift_1.jpg",
      },
    ],
    total_gifts: 3,
  };

  return (
    <div className={`h-full relative ${step === "2" && "bg-pink-50 "}`}>
      {step === "1" && (
        <Step1
          delivery={giftBag.delivery_character_type}
          color={giftBag.design_type}
        />
      )}
      {step === "2" && <Step2 gifts={giftBag.gifts} />}
      {step === "3" && <Step3 delivery={giftBag.delivery_character_type} />}
    </div>
  );
};

export default Page;
