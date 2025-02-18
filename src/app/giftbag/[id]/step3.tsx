"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Delivery from "../../../../public/img/delivery_1.svg";
import { Button } from "@/components/ui/button";

const Step3 = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const handleGoBack = () => {
    if (id) {
      router.push(`/giftbag/${id}?step=2`);
    }
  };

  return (
    <div>
      <div className="mt-[131px] mb-[133px] flex flex-col justify-center items-center gap-8">
        <div className="w-[200px] h-[200px] flex justify-center items-center">
          <Image src={Delivery} alt="deliveryMan" />
        </div>
        <p className="text-lg font-bold font-nanum">
          정성껏 답변을 남겨주셔서 감사해요!
        </p>
        <p className="text-center text-sm font-nanum text-gray-700 pt-[2px]">
          저는 답변을 전달하러 가볼게요! <br /> 바쁘다 바빠~
        </p>
        <Button
          variant="link"
          className="text-xs text-gray-400 underline"
          onClick={handleGoBack}
        >
          내가 받은 선물 다시보러 가기
        </Button>
      </div>
    </div>
  );
};

export default Step3;
