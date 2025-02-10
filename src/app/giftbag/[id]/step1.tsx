"use client";

import { Button } from "@/components/ui/button";
import Delivery from "../../../../public/img/delivery_1.svg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const Step1 = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const handleOnClick = () => {
    //api 추가
    router.push(`/giftbag/${id}?step=2`);
  };

  return (
    <div className="flex flex-col gap-[90px]">
      <div className="flex flex-col justify-center items-center mt-[90px] gap-8">
        <p className="text-lg font-bold font-nanum">
          똑똑! 선물 보따리 배달왔습니다!
        </p>
        <div className="w-[200px] h-[200px] items-center justify-center flex">
          <Image
            src={Delivery}
            alt="deliveryMan"
            className="h-[185px] w-[143px]"
          />
        </div>
        <p className="text-center text-sm font-nanum text-gray-700 pt-[2px]">
          어떤 선물이 들어있는지 함께 열어볼까요? <br />
          너무 궁금해서 참을 수가 없어요!
        </p>
      </div>
      <Button size="lg" onClick={handleOnClick}>
        선물 보따리 풀어보기
      </Button>
    </div>
  );
};

export default Step1;
