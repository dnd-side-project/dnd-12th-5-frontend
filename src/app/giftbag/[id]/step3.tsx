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
    <div className="relative w-full overflow-hidden h-full">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/img/background_union.svg')" }}
      />
      <div className="relative z-10 flex flex-col gap-[38px] justify-center items-center min-h-screen">
        <div className="w-[230px] h-[230px] flex justify-center items-center">
          <Image src={Delivery} alt="deliveryMan" />
        </div>
        <div className="flex flex-col gap-[13px]">
          <p className="text-lg font-bold font-nanum">
            정성껏 답변을 남겨주셔서 감사해요!
          </p>
          <p className="text-center text-sm font-nanum text-gray-700 pt-[2px]">
            저는 답변을 전달하러 가볼게요! <br /> 바쁘다 바빠~
          </p>
        </div>
        <Button
          variant="secondary"
          className="text-xs text-gray-400 w-[212px] rounded-[60px] bg-white"
          onClick={handleGoBack}
        >
          내가 받은 선물 다시보러 가기
        </Button>
      </div>
    </div>
  );
};

export default Step3;
